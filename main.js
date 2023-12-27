const express = require("express");
const router = require("./router/router");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json()); // parse JSON bodies
app.use(cookieParser());

// using ejs as the view engine
app.set("view engine", "ejs");

app.use("/", router);

// connect to database and start server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
    // Consider adding more robust error handling here
  });
