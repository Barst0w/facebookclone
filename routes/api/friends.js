const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Users = require('../../models/users')

// Sends userid to post like data, and only allows one entry per userid.
router.post("/friendRequest", async (req, res, next) => {
    const friend_id = mongoose.Types.ObjectId(req.body.id)
    const userid = mongoose.Types.ObjectId(req.user._id)

    await Users.findById(friend_id, (err, friend) => {
        if (friend.friendRequest.includes(userid)) {
              return res.json('Friend Request already sent')
        } else {
          friend.friendRequest.push(userid)
          friend.save(err => {
              if (err) {
                  return next(err)
              }                
          }) 
        }
    })
})

module.exports = router;