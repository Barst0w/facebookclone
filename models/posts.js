const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectId;
const Schema = mongoose.Schema;

const Posts = mongoose.model(
    "Posts",
    new Schema({
      content: { type: String, required: true },
      author: { type: String, required: false },
      date: {type: Date, required: false},
      likes: [{ type: ObjectID, required: false }],
      userid: {type: ObjectID, required: false}
    })
  );

module.exports = Posts;