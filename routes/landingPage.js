const express = require('express');
const User = require('../models/users')
const Posts = require('../models/posts')
const Comments = require('../models/comments')
const Users = require('../models/users')
const router = express.Router()
const app = express()

const comments_api = require('./api/comments')
const login_api = require('./api/login')
const posts_api = require('./api/posts')
const friends_api = require('./api/friends')

router.use('/', login_api)
router.use('/', posts_api)
router.use('/', comments_api)
router.use('/', friends_api)

// Loads home view, which loads either home or signup depending on user session. Passes through values from database and random number generator.
router.get('/', async (req, res) => {
    const allComments = await Comments.countDocuments()
    const allUsers = await Users.countDocuments() - 1
    const numArray = [];

    for (let i = 0; i < 3; ++i) {
        let num = Math.floor(Math.random() * (allUsers - 0 + 1)) + 0;
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
                console.log('rendered')
            })
        })
    })
})

module.exports = router;