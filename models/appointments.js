const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AppointmentSchema = new schema({
  property_id: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = Appointments = mongoose.model(
  "appointments",
  AppointmentSchema
);
