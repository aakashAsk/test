const contact = require('express').Router();
const contactController = require('../controller/contact.controller');
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const path = require('path');

const MINE_TYPE_MAP = {
  "image/jpeg": 'jpg',
  "image/png": "png",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("invalid type");
    if (isValid) {
      error = null;
    }
    cb(error, 'public/images')
  },
  filename: (req, file, cb) => {
    const exe = MINE_TYPE_MAP[file.mimetype];
    cb(null, 'img' + '_' + Date.now() + '.' + exe);
  }
});

contact.post('/addContact', multer({ storage: storage }).single('profileImage'), contactController.addContact)
contact.get('/getAllContact', contactController.getAllContact);
contact.delete('/deleteContact', contactController.deleteContact);
contact.post('/editContact', multer({ storage: storage }).single('profileImage'), contactController.editContact);

module.exports = contact;