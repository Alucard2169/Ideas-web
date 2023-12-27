const router = require("express").Router();
const { initial,signup, login, logout } = require("../controller/controller");


//----RENDER PAGES----//
router.get("/", (req, res) => {
  res.render("home")
});
router.get("/createIdea", (req, res) => {
  res.render("createIdeas")
})
router.get("/createAccount", (req, res) => {
  res.render("createAccount")
})
router.get("/login", (req, res) => {
  res.render("login")
})
router.get("/profile", (req, res) => {
  res.render("profile")
})


//----AUTH----//

router.get("/initial",initial)
router.post("/addUser", signup);
router.post("/loginUser", login);
router.get("/logout", logout)



module.exports = router;
