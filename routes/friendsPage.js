const express = require('express');
const Users = require('../models/users')
const mongoose = require('mongoose');
const router = express.Router()

const login_api = require('./api/login')

router.use('/', login_api)

router.get('/friends', async (req, res) => {
    const friendRequest = await req.user.friendRequest;

    await Promise.all(friendRequest.map(user => {
        return Users.findById(user)
    })).then(allRequests => {res.render('friendsPage', {allRequests})})

})

module.exports = router;