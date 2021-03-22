const productModel = require('../../models/Admin/product.model');
const categoryModel =  require('../../models/master/category.model');

module.exports = {
  addProduct:async (req, res) => {
    // try{
      
      const url = "http://localhost:3000/images/";
      const checkProduct = await productModel.findOne({ title: req.body.title });
      
      if (!checkProduct) {
        
        var data = {
          title: req.body.title,
          price: parseFloat(req.body.price),
          category: JSON.parse(req.body.category)._id,
          productCode: req.body.productCode,
          img: url + req.file.filename,
          regionFood: req.body.regionFood,
          serviceType: JSON.parse(req.body.serviceType),
          foodType: req.body.foodType
        }
        console.log(data);
        // }
        new productModel(data)
        .save()
        .then(result => {
          console.log("28",result)
          if (result) {
            res.status(200).json({
              status: true,
              result: result
            })
          }
          else {
            res.status(200).json({
              status: false,
              error: 'something went wrong'
            })
          }
        })
      }
      else{
        res.status(200).json({
          status: false,
          error: 'Product is already registered'
        })
      }
    // }
    // catch (err) {
    //   res.status(400).json({
    //     status: false,
    //     error: err
    //   })
    // }
  },

  getAllProduct: (req, res) => {
    try{
      productModel.find({isActive:true})
      // .sort({_id: -1})
      .populate('category')
      .populate('priceUnitId')
      .then(result => {
        if(result){
          res.status(200).json({
            status: true,
            result: result
          })
        }
        else{
          res.status(200).json({
            status: false,
            error: 'product not found'
          })
        }
      })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  },

  searchProduct:(req, res) => {
    try {
      var regex = new RegExp("^" + req.query.keyword);
      productModel.find({ $or: [
        { productCode: { $regex: regex, $options: 'i' } },
        { title: { $regex: regex, $options: 'i' } }
      ],
      isActive: true })
      .populate('category')
      .populate('priceUnitId')
      .then(result => {
          if (result) {
            res.status(200).json({
              status: true,
              result: result
            })
          }
          else {
            res.status(200).json({
              status: false,
              error: 'product not found'
            })
          }
        })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  },

  deActiveProduct: (req, res) => {
    try {
      productModel.findOneAndUpdate({ _id: req.body.id }, { outOfStockManully: req.body.outOfStockManully, outOfStock: req.body.outOfStock, outOfStockFromDate: new Date(req.body.outOfStockFromDate)}, {new: true})
      .then(result => {
        if (result) {
          res.status(200).json({
            status: true,
            result: result
          })
        }
        else {
          res.status(200).json({
            status: false,
            error: 'something went wrong'
          })
        }
      })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  },

  deleteProduct: (req, res) => {
    try {
      console.log(req.query);
      productModel.findOneAndUpdate({ _id: req.query.id }, {isActive: req.query.isActive}, { new: true })
        .then(result => {
          if (result) {
            res.status(200).json({
              status: true,
              result: result
            })
          }
          else {
            res.status(200).json({
              status: false,
              error: 'something went wrong'
            })
          }
        })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  },

   getProductById: (req, res) => {
    try {
      productModel.findOne({ _id: req.query.id, isActive: true })
      .populate('category')
      .then(result => {
        if (result) {
          res.status(200).json({
            status: true,
            result: result
          })
        }
        else {
          res.status(200).json({
            status: false,
            error: 'Product not found'
          })
        }
      })
    }
    catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  },

  updateProduct: async (req, res) => {
    // try{

    const url = "http://localhost:3000/images/";
      if(req.file){
        var data = {
          title: req.body.title,
          price: parseFloat(req.body.price),
          category: JSON.parse(req.body.category)._id,
          productCode: req.body.productCode,
          img: url + req.file.filename,
          regionFood: req.body.regionFood,
          serviceType: JSON.parse(req.body.serviceType),
          foodType: req.body.foodType
        }
      }
      else{
        var data = {
          title: req.body.title,
          price: parseFloat(req.body.price),
          category: JSON.parse(req.body.category)._id,
          productCode: req.body.productCode,
          img: req.body.img,
          regionFood: req.body.regionFood,
          serviceType: JSON.parse(req.body.serviceType),
          foodType: req.body.foodType
        }
      }
      productModel.findOneAndUpdate({_id: req.body.id}, data, {new: true})
      .then(result => {
        // console.log(result);
        if (result) {
          res.status(200).json({
            status: true,
            message: 'Product is updated successfull',
            result: result
          })
        }
        else {
          res.status(200).json({
            status: false,
            message: 'Product is not found'
          })
        }
      })
    // }
    // catch (err) {
    //   res.status(400).json({
    //     status: false,
    //     message: err
    //   })
    // }
  }
}