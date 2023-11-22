const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

//Custom moddleware
const checkAccess = (req, res, next) => {
  console.log("This is a middleware");
  let hasAccess = false;
  if (hasAccess) {
    next();
  } else {
    res.send("Access denied");
  }
};

app.use(checkAccess);

const DUMMY_DB = {
  "rupesh@gmail.com": { password: "123", currentlyLoggedIn: false },
  "kumar@gmail.com": { password: "123", currentlyLoggedIn: false },
};

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/login", (req, res) => {
  if (
    DUMMY_DB[req.body.email] &&
    DUMMY_DB[req.body.email].password === req.body.password
  ) {
    res.redirect("/landing");
  } else {
    res.redirect("/signup");
  }
});

app.get("/landing", (req, res) => {
  res.send("landing page");
});

app.get("/signup", (req, res) => {
  res.send("Please Sign up first");
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});

/*
  ## Middleware:
  Diagram : https://miro.medium.com/v2/resize:fit:945/

*/
