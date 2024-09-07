const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    grade: String,
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    mentorHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
  });


  module.exports = mongoose.model('student',studentSchema,'mentorStudent')

