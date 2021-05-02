const express = require("express");
const bodyparser = require("body-parser");
const handler = require("./routes/user");
const exams = require("./routes/exam");
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", handler);
app.get("/exams/:id", (req, res) => {
  let x = req.params.id;
  res.render("view", { page: "view", form: exams[x] });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
