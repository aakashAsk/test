const auth = require('express').Router();
const authController = require('../controller/auth.controller');
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

auth.post('/signup', multer({ storage: storage }).single('profileImage'), authController.signup)
auth.post('/login', authController.login)

module.exports = auth;