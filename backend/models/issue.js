const mongoose = require('mongoose');

// Issue Schema
const IssueSchema = mongoose.Schema({
  title: { 
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  }
});

const Issue = module.exports = mongoose.model('Issue', IssueSchema);