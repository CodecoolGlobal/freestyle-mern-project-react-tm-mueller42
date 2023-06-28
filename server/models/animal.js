const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const animalSchema = new Schema({
  id: String,
  title: String,
  comment: String,
  breed: String,
  favourite:Boolean,
  rating:Number,
  createdAt: Date,
  imgUrl:String,
  type:String
});

const Animal = model('Animal', animalSchema);


module.exports = Animal;
