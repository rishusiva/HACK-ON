const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.render("login2", { page: "login2" });
});
Router.get("/home", (req, res) => {
  res.render("index", { page: "index" });
});
Router.get("/contact", (req, res) => {
  res.render("contact", { page: "contact" });
});
Router.get("/profile", (req, res) => {
  res.render("profile", { page: "profile" });
});
Router.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});
Router.get("/exams", (req, res) => {
  res.render("exams", { page: "exams" });
});
module.exports = Router;
