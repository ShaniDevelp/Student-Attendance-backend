const mongoose = require('mongoose');

const gradingSystemSchema = new mongoose.Schema({

  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },

  grade: { 
    type: String, 
    required: true 
  },
  
  minAttendanceDays: { 
    type: Number, 
    required: true
   },

   
  // Other grading system details
});

const GradingSystem = mongoose.model('GradingSystem', gradingSystemSchema);

module.exports = GradingSystem;

