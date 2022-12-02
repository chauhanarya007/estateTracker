const express = require("express");
const router = express.Router();
const passport = require('passport')

const Property = require("../models/property");

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/auth/login')
}

router.get("/", (req, res) => {
  Property.find((err, properties) => {
    if (err) {
      console.log(err);
    } else {
      res.render("properties/index", {
        title: "Properties",
        properties: properties,
        user: req.user
      });
    }
  });
});

router.get("/create", isAuthenticated, (req, res) => {
  res.render("properties/create", { title: "Add Property", user: req.user });
});

router.post("/create", (req, res) => {
  // create a new property document from the fields in the form post
  Property.create(req.body, (err, newProperty) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/properties");
      
    }
  });
});

//delete
router.get("/delete/:_id", isAuthenticated, (req, res) => {
  Property.remove({ _id: req.params._id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/properties/");
    }
  });
});

//edit method
router.get("/edit/:_id", isAuthenticated, (req, res) => {
  Property.findById(req.params._id, (err, property) => {
    if (err) {
      console.log(err);
    } else {
      res.render("properties/edit", {
        title: "Property Details",
        property: property,
        user: req.user
      });
    }
  });
});

router.post("/edit/:_id", isAuthenticated, (req, res) => {
  Property.findByIdAndUpdate(
    { _id: req.params._id },
    req.body,
    null,
    (err, property) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/properties");
      }
    }
  );
});

// make public
module.exports = router;
