var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { isCelebrate } = require('celebrate');
const path = require('path');
const dotenv = require('dotenv/config');
// headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// routers
const authRoute = require('./router/auth.routes');
const contactRoute = require('./router/contact.routes');


// initial route
app.use(authRoute);
app.use(contactRoute);


//error handling
app.use((err, req, res, next) => {
  if (isCelebrate(err)) {
    if (err && err.joi.details) {
      const error = err.joi.details.map(er => er.message.replace(/"/g, ""));
      return res.status(422).json({
        error: error[0]
      });
    }
    return res.status(422).json({
      ...err
    });
  }
  const statusCode = err.status || 500;
  const message = {};
  message.message = err.message;
  message.error = "Internal Server Error";
  next();
  return res.status(statusCode).json({
    ...message
  });
});

/////////////// public file

const url = "mongodb://localhost:27017/test";

//######################## create server ###########################################
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("connect at port 3000");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })