const mongoose = require('mongoose');
let schema = new mongoose.Schema({
  agent: {type: mongoose.Schema.Types.ObjectId, ref: 'PropertyAgent', required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
  organisation: {type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true},
  listingType: {type: String, required: true},
  listingSector: {type: String, required: true},
  unit: {
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    parking: {type: Number, required: true},
    price: {type: Number, required: true}
  },
  images: {type: [String], required: true}
})
module.exports = mongoose.model('PropertyItem', schema)
