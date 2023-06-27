const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const voteSchema = new Schema({
  catVotes: Number,
  dogVotes: Number,
  catRating: Number,
  dogRating: Number,
  numberOfCats: Number,
  numberOfDogs: Number,
  name: {
    type: String,
    default: "votes",
  },
});

const Vote = model('Vote', voteSchema);


module.exports = Vote;
