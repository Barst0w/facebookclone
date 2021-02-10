const express = require('express');
const passport = require('passport');
const User = require('../models/users')
const Posts = require('../models/posts')
const Comments = require('../models/comments')
const bcrypt = require("bcryptjs")
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose');
const router = express.Router()
const app = express();

exports.get_landingPage = router.get('/', async (req, res) => {
    const allComments = await Comments.countDocuments()
    const numArray = [];

    for (let i = 0; i < 3; ++i) {
        let num = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        if (numArray.includes(num)) {
            --i
        } else {
            numArray.push(num)
        }
    }
    
    await User.find({}, function(err, user) {
        Posts.find({}, function(err, posts) {
            Comments.find({}, function(err, comments) {
                res.render('home', {user, numArray, posts, comments, allComments})
            })
        })
    })
})

passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, {msg: "Incorrect password"})
            }
          })
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  exports.set_currentUser = app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
  
  exports.post_login = app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

  exports.post_createpost = app.post("/createpost", [
    check('content', 'Content is Invalid').exists().bail().isLength({max: 400}).bail()
], (req, res, next) => {
    const currentUser = req.user.firstName + " " + req.user.surname;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
                const posts = new Posts({
                    content: req.body.content,
                    author: currentUser,
                    date: Date.now(),
                    likes: 0,
                    userid: req.user.id
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
        }
  });

  exports.post_createcomment = app.post("/createcomment", [
    check('content', 'Content is Invalid').exists().bail().isLength({max: 300}).bail()
], (req, res, next) => {
    const currentUser = req.user.firstName + " " + req.user.surname;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
                const comments = new Comments({
                    content: req.body.content,
                    author: currentUser,
                    date: Date.now(),
                    parentpostid: req.body.parentpostid,
                    userid: req.user.id
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
        }
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });