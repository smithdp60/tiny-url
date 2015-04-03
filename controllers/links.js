var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

// CREATE LINK
// Accepts data from the form. Stores the url in the database and redirects to the show route.
router.post("/", function(req, res) {
  db.links.create({url: req.body.url}).then(function(data) {
    var hash = hashids.encode(data.id);
    data.hash = hash;
    data.save().then(function(taco) {
      res.render("links/index", {taco: req.headers.host+"/"+data.hash})
    });
  })
});

module.exports = router;