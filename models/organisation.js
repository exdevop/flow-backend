const mongoose = require('mongoose');
let schema = new mongoose.Schema({
  name: {type: String, required: true},
  logoUrl: {type: String, required: true},
  address: {type: String},
  description: {type: String}
})
module.exports = mongoose.model('Organisation', schema)
