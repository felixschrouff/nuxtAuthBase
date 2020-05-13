const users = require('../../controllers/user.controller');
const User = require('../../models').User
const auth = require('../../config/middlewares/auth');
const app = require('express')
const routes = app.Router();
const passport = require('passport')


const fail = {
  failureRedirect: '/login'
};

routes.get('/', (req,res) => {
  res.sendStatus(200);
})


routes.get('/ping', (req,res) => {
      res.send('pong')
  });


  //userRoutes
 // routes.post('/login', passport.authenticate('local', { successRedirect: '/backend', failureRedirect: '/fail', failureFlash: 'faiöed'}));
  routes.post('/login', passport.authenticate('local', { successRedirect: '/backend', failureFlash: 'faiöed'}));


  routes.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
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
  });

  module.exports = routes;
