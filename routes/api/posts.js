const express = require('express');
const router = express.Router()
const Posts = require('../../models/posts')
const { check, validationResult } = require('express-validator')

// Creates a post and sends data to the database.
router.post("/createpost", [
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
                    userid: req.user.id
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
        }
  });

  module.exports = router;