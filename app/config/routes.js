const users = require('../controllers/user.controller');
//const posts = require('../controllers/post.controller');
const auth = require('./middlewares/auth');

//ROUTES
const r_api = require('../routers/api/index');


const fail = {
  failureRedirect: '/login'
};

module.exports = function(app, passport) {

  app.use('/api', r_api);

};
