const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectId;
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
      firstName: { type: String, required: true },
      surname: { type: String, required: true },
      email: {type: String, required: true},
      password: { type: String, required: true },
      friends: [{ type: ObjectID, required: true }],
      friendRequest: [{type: ObjectID, required: true}]
    })
  );

module.exports = User;