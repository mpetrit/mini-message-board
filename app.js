const path = require("node:path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});
app.get("/new", (req, res) => {
  res.render("form");
});
app.post("/new", (req, res) => {
  messages.push({
    id: messages.length + 1,
    text: req.body.comment,
    user: req.body.username,
    added: new Date(),
  });
  res.redirect("/");
});
app.get("/message/:id", (req, res) => {
  res.render("message", {
    message: messages.find((el) => el.id === Number(req.params.id)),
  });
});
app.get("/{*splat}", (req, res) => {
  res.send("Page not found!");
});
app.listen(PORT, () => console.log("Started the server on port:", PORT));
