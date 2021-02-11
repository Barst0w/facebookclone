const express = require('express');
const router = express.Router()
const Comments = require('../../models/comments')
const { check, validationResult } = require('express-validator')

// Creates a comment and sends the data to the database.
router.post("/createcomment", [
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

  module.exports = router;