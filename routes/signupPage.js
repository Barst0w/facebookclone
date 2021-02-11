const express = require('express');
const User = require('../models/users')
const bcrypt = require("bcryptjs")
const { check, validationResult } = require('express-validator')
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signupPage')
})

router.post("/signup", [
    check('firstName', 'Username is Invalid').exists().bail().custom((value) => value === value.charAt(0).toUpperCase() + value.slice(1)).bail(),
    check('surname', 'Username is Invalid').exists().bail().custom((value) => value === value.charAt(0).toUpperCase() + value.slice(1)).bail(),
    check('email', 'Email is Invalid').exists().bail().isEmail().bail(),
    check('password', `Password's don't match`).exists().bail(),
    check('confirmPassword', `Password's don't match`).custom((value, {req}) => value === req.body.password)
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) next(err)
            else {
                const user = new User({
                    firstName: req.body.firstName,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: hashedPassword,
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
            }
          });
    }
  });

  module.exports = router;