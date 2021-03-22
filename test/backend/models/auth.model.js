const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: { type: String },
  email: { type: String },
  number: { type: String },
  password: { type: String },
  isActive: { type: Boolean, default: true },
  profileImage: { type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('auth', authSchema);