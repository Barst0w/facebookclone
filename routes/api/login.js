const express = require('express');
const passport = require('passport');
const bcrypt = require("bcryptjs")
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../../models/users')
const router = express.Router()

// Verifies user validity from database.
passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
      Users.findOne({ email: email }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        } else {
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, {msg: "Incorrect password"})
            }
          })
        }
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Authenticates a login.
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

  // Sets the currentUser local variable based off the user request after login.
router.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        next()
  });

  // Log's out.
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  module.exports = router;