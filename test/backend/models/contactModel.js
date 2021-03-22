const mongoose = require('mongoose');
const contactScehma = mongoose.Schema;

const contactModel = new contactScehma({
  email: {type:String},
  number: { type: Number },
  note: {type:String},
  name: {type:String},
  realation: {type:String},
  isFavourite: { type: Boolean, default:false },
  profileImage: {type: String}
});

module.exports = mongoose.model('contacts', contactModel);