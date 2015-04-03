var express = require('express');
var bodyParser = require('body-parser');
var linksCtrl = require("./controllers/links");
var app = express();
var db = require("./models");

var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

// Tell Express to use EJS files
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))
app.use("/links", linksCtrl)

//homepage
app.get("/", function(req, res) {
  res.render("index");
});

//redirect
app.get("/:hash", function(req, res) {
  db.links.find({ where: {hash: req.params.hash}}).then(function(data) {
    res.redirect(data.url);
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("App listening on port 3000");
});