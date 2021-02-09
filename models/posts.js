const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Posts = mongoose.model(
    "Posts",
    new Schema({
      content: { type: String, required: true },
      author: { type: String, required: false },
      date: {type: Date, required: false},
      comments: { type: String, required: false },
      likes: { type: Number, required: false }
    })
  );

module.exports = Posts;