const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({

  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },

  studentName: { 
    type : String,
    required: true 
  },
  
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  isApproved: {
    type: Boolean, 
    default: false 
  },
  Rejected: {
    type: Boolean,
    default: false
  }
  
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
