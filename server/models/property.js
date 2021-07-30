const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PropertySchema = new schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  area_size: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  price_rate: {
    type: String,
    required: true,
    trim: true,
  },
  property_details: {
    type: String,
    required: true,
    trim: true,
  },
  agent: {
    type: String,
    required: true,
    trim: true,
  },
  posted_on: {
    type: String,
    required: true,
    trim: true,
  },
  contact_no: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Property = mongoose.model("property", PropertySchema);
