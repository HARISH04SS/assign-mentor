const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    expertise: String,
    yearsOfExperience: Number,
  });

  module.exports = mongoose.model('mentor',mentorSchema,'mentorStudent')