const contact = require('../models/contactModel');
const jwt = require('./jwsToken');



module.exports = {

  addContact: async (req, res) => {
    // try {
      const imageUrl = "http://localhost:3000/images/";
      const check = await contact.findOne({ $or: [{ name: req.body.name }]}).exec();
      console.log(check)
      if(!check){
        const data = {
          email: req.body.email,
          number: parseInt(req.body.number),
          note: req.body.note,
          name: req.body.name,
          realation: req.body.realation,
          isFavourite: req.body.isFavourite,
          profileImage: req.file ? imageUrl + req.file.filename : req.body.profileImage
        }
        new contact(data)
          .save()
          .then(result => {
            if (result) {
              console.log(result)
              res.status(200).json({
                status: true,
                message: `Contact created successfully`,
                result: result
              })
            }
            else {
              res.status(409).json({
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
          message: `User with ${req.body.name} is already in your contact`
        })
      }
    // }
    // catch (err) {
    //   res.status(400).json({
    //     status: false,
    //     error: "error",
    //     message: err
    //   })
    // }
  },

  getAllContact: (req, res) => {
    try {
      contact.find()
      .then(result => {
        if (result) {
          return res.status(200).json({
            status: true,
            message: "Data found successfully",
            result: result,
          });
        }
        else {
          return res.status(401).json({
            status: false,
            message: "somethin wrong",
            result: result,
          });
        }
      })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: "error",
        message: err
      })
    }
  },

  deleteContact: (req, res) => {
    try {
    contact.findOneAndDelete({_id: req.query.id})
      .then(result => {
        if (result) {
          return res.status(200).json({
            status: true,
            message: "Data delete",
            result: result,
          });
        }
        else {
          return res.status(401).json({
            status: false,
            message: "somethin wrong",
            result: result,
          });
        }
      })
      }
      catch (err) {
        res.status(400).json({
          status: false,
          error: "error",
          message: err
        })
      }
  },

  editContact: (req, res) => {
    // try {
    console.log(req.body);
    const imageUrl = "http://localhost:3000/images/";
      const data = {
        email: req.body.email,
        number: parseInt(req.body.number),
        note: req.body.note,
        name: req.body.name,
        realation: req.body.realation,
        isFavourite: req.body.isFavourite,
        profileImage: req.file ? imageUrl + req.file.filename : req.body.profileImage
      }
      contact.findOneAndUpdate({ _id: req.body.id }, data, {new : true})
      .then(result => {
        if (result) {
          return res.status(200).json({
            status: true,
            message: "update delete",
            result: result,
          });
        }
        else {
          return res.status(401).json({
            status: false,
            message: "somethin wrong",
            result: result,
          });
        }
      })
  //   }
  //   catch (err) {
  //     res.status(400).json({
  //       status: false,
  //       error: "error",
  //       message: err
  //     })
  //   }
  },
}
