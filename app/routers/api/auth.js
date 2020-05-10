const users = require('../../controllers/user.controller');
const User = require('../../models/user')
const auth = require('../../config/middlewares/auth');
const app = require('express')
const routes = app.Router();
const passport = require('passport')


const fail = {
  failureRedirect: '/login'
};


routes.get('/ping', (req,res) => {
      res.send('pong')
  });


  //userRoutes
  routes.post('/login',
  passport.authenticate('local', { successRedirect: '/backend',
                                   failureRedirect: '/fail',
                                   failureFlash: true
                                 }
  ));
  routes.get('/login', (req,res) => {
      res.send('Use Post, dumbass')
  })
  routes.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  routes.post('/register', (req,res) => {
    users.create(req,res);
  })
  routes.get('/me', function (req,res) {
        
        if(!req.user) return res.sendStatus(400)
        let id = req.user.id
        User.findByPk(id).then(function(user) {
        if(user) {
            return res.json(user);
        } else {
            return res.json(user.errors);
        }
    });
  })

  routes.get("/ping", (req,res) => {
    res.send("pdong")
  })

  routes.get("/backend", auth.requiresLogin, (req,res) => {
    res.json({ id: req.user.id, username: req.user.username })
  })


  module.exports = routes;