'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models').User;
var users = require('../../controllers/user.controller')

module.exports = new LocalStrategy(
    (username, password, done)=> {
    users.login(username,password,done);
    });


