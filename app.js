// Required stuff
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
// Makes the app
const app = express();

console.log(date())

var itemList = new Array();
var workList = new Array();
// Setting the renderer to ejs, enables bodyParser, makes the public folder work
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index', {
    listTitle: currentDay,
    listItems: itemList
  });
});
app.get("/work", (req, res) => {
  res.render('index', {
    listTitle: "Work list",
    listItems: workList
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
//Checks from which page got request. Responds with correct list.
app.post("/", (req, res) => {
  var newItem = req.body.newItem;
  if (req.body.list === "Work") {
    workList.push(newItem);
    res.redirect("/work");
  } else {
    itemList.push(newItem);
    res.redirect("/");
  }
});

// Tells us when app is up and ready
app.listen(process.env.PORT || 3000, () => {
  console.log("App ready and listening!")
});
