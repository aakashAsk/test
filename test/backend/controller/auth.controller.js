const authModel = require('../models/auth.model');
const jwt = require('./jwsToken');
const secretKey = "sdafghgo;terkfdiohgwetubiovsseirtgshtudfxehdrntuidbogaosgidhfsiudfgydbhufdjkblxr";

const signup = async (req, res) => {
  // try{
    console.log(req.body)
    const url = "http://localhost:3000/images/";
    const check = await authModel.findOne({ $or: [{ email: req.body.email }, { number: req.body.number }, { name: req.body.name }] }).exec();
    console.log(check)
    if (!check){
      new authModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        profileImage: url + req.file.filename
      })
      .save()
      .then(result => {
        console.log(result)
        if (result) {
          res.status(200).json({
            status: true,
            message: "User Added Successfully",
            result: result
          })
        }
        else {
          res.status(200).json({
            status: false,
            error: "error",
            message: "Somethin Wrong.."
          })
        }
      })
    }
    else {
      res.status(200).json({
        status: false,
        error: "error",
        message: "Admin details already registered"
      })
    }
  // }
  // catch(err){
  //   res.status(400).json({
  //     status: false,
  //     error: "error",
  //     message: err
  //   })
  // }
}

const login = async (req, res) => {
  // try {
    authModel.findOne({ $or: [{ username: req.body.loginId }, { email: req.body.loginId }, { number: req.body.loginId }], password: req.body.password })
    .then(result => {
      console.log(!result)
      if (result) {
        res.status(200).json({
          status: true,
          message: "login successfully",
          result: result,
        });
      }
      else {
        console.log("sadasd")
        res.status(200).json({
          status: false,
          message: "login details is not valid",
          result: result,
        });
      }
    })
  // }
  // catch (err) {
  //   res.status(400).json({
  //     status: false,
  //     error: "error",
  //     message: err
  //   })
  // }
}

module.exports = {signup, login}



