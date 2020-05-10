var express = require('express')
var app = express();



let Logger = (function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


exports.module = { logger }