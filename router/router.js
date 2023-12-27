const router = require("express").Router();
const jwt = require("jsonwebtoken")
const { initial,signup, login, logout, addIdea, getIdea,updateVoteCount } = require("../controller/controller");


//----RENDER PAGES----//
router.get("/", getIdea);
router.get("/createIdea", (req, res) => {
  
  const token = req.cookies.session;
  if (token) {
      res.render("createIdeas");
  } else {
    res.redirect("/")
  }

})
router.get("/createAccount", (req, res) => {
  res.render("createAccount")
})
router.get("/login", (req, res) => {
  res.render("login")
})




//----AUTH----//

router.get("/initial",initial)
router.post("/addUser", signup);
router.post("/loginUser", login);
router.get("/logout", logout)


//----IDEA----//
router.post("/saveIdea", addIdea);
router.put("/ideas/:id", updateVoteCount);


module.exports = router;
