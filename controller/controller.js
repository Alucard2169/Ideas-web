const bcrypt = require("bcrypt");
const UserAccount = require("../models/userModel.js");
const jwt = require("jsonwebtoken")



const initial = async (req, res) => {

  const token = req.cookies.token;

 if (token) {
   try {
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
     const userId = decodedToken.id;

     // Fetch user data from the database
       const user = await UserAccount.findById(userId);
       
     const userData = {id: user.id,username: user.username}
     if (user) {
       // Send the user data to the client
         res.json({ user: userData });
     } else {
       // If no user was found, return an error message
       res.status(400).json({ message: "User not found" });
     }
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "An error occurred" });
   }
 } else {
   // If no token was found, redirect the user to the login page
   res.redirect('/');
 }
};


const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await UserAccount.findOne({ username: username });

    if (existingUser) {
      // Send message that user already exists
      return res.status(400).json({ message: "User already exists" });
    }

    // If the user doesn't exist, create one
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserAccount({
      username,
      password: encryptedPassword,
    });
    await newUser.save();

    const userData = { username: newUser.username, id: newUser._id };
    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET);
    
    res.cookie("session", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({ message: "User created successfully", user: userData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserAccount.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userData = { username: user.username, id: user._id };
    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET);

    res.cookie("session", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

      res.status(200).json({ message: "Logged in successfully", user: userData });

  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};


const logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("session");
    
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};


module.exports = {initial,signup,login,logout}