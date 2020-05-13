const routes = require('express').Router();

//auth api
routes.use('/auth', require('./auth'));


module.exports = routes;
