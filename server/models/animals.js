const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const animalsSchema = new Schema({
  title: String,
  comment: String,
  breed: String,
  favorite:Boolean,
  votes:Number,
  createdAt: Date,
  imgUrl:String,
  type:String
  
});

const Animals = model('animals', animalsSchema);


module.exports = Animals;
