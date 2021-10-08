const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  phone_no: {
    type: Number,
    required: true,
    unique: true,
  },
  saved_property: {
    type: Array,
    default: [],
  },
});

module.exports = Users = mongoose.model("user", UserSchema);
