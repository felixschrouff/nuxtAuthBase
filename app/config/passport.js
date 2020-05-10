var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
const User = require('../models').User
var bodyParser = require('body-parser')

const local = require('./passport/local');

module.exports = function(passport) {
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if(user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use(local)
}