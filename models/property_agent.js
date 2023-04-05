const mongoose = require('mongoose');
let schema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  contactNumber: {type: String, required: true},
  profileImageUrl: {type: String, required: true}
})
module.exports = mongoose.model('PropertyAgent', schema)
