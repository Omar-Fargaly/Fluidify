// models/taskModel.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  categories: [{
    type: String,
    trim: true
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  reminder: {
    type: Date,
    required: false
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);
