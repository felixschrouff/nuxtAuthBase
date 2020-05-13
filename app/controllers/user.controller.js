var async = require('async');
const db = require('../models');
//const config = require('../config/auth.config');
const User = db.User;
const { Op } = require("sequelize");

const validIncludes = [ 'Post' , 'userRoles' ]

exports.load = function (req, res, next, _id) {
  const criteria = { _id };
  User.findByPk(criteria).then(function(user) {
    if (user) {
        req.pofile = user.get();
        next();
    } else {
        return next(new Error('User not Found!'));
    }
    }).catch((err => {return next (err);}));
};
exports.getOne = function(req,res) {
  var includes;
  if(validIncludes.includes(req.query.include)){
    includes = req.query.include
    console.log(includes)
  }
  User.findOne(req.params.userId, {
    include: includes
})
  .then(user => {
    res.json(user);
  })
  .catch(err => res.json(err));
}

exports.getAll = function(req,res) {
  var includes;
  if(validIncludes.includes(req.query.include)){
    includes = req.query.include
    console.log(includes)
  }
  User.findAll({
    include: includes
})
  .then(user => {
    res.json(user);
  })
  .catch(err => res.json(err));
}

exports.create = function(req,res) {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    res.send({message: `User ${user.username}  with email ${user.email} successfully registered.` });
  })
  .catch(err => {
    res.send({message: `Error: ${err.message}`})
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};


exports.login = function(username,password,done){
  User.findOne({
    where: {
      [Op.or]: [
        {username: username},
        {email: username}
      ]
    }
  })
  .then((user => {
    if(!user){
        console.log('wrong user')
      return done(null, false, { message: 'Incorrect username.' });
    }
    if(!user.validPassword(password)){
        console.log('wrongPW')
      return done(null, false, { message: 'Incorrect password.' });
    }
    else {
      console.log('welcome')
      return done(null, user, {message: "Welcome"});
    }
  }))
};
