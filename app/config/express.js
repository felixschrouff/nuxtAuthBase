const express = require('express');
const session = require('express-session');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../models');
const flash = require('connect-flash');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport){
  app.use(
    compression({
      threshold: 512
    })
  );

 /* app.use(
    cors({
      origin: ['http://localhost:3000', 'https://picdb.scix.cc'],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true
    })
  );*/

  app.use(function(req, res, next) {
    res.locals.env = env;
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'cmdbeschtewogibt',
    cookie: {maxAge: 1000*60*60*24}
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());


  db.sequelize.sync({
    //force: true
  })
  .then(() => {
    console.log('DB synced or recreated');
  })


};
