const users = require('../controllers/user.controller');
//const posts = require('../controllers/post.controller');
const auth = require('./middlewares/auth');

//ROUTES



const fail = {
  failureRedirect: '/login'
};

module.exports = function(app, passport) {
  const pauth = passport.authenticate.bind(passport);

   const r_api = require('../routers/api/index');
    app.use('/api', r_api);

  app.get('/fail', (req,res) => {
    var message = req.flash('message')
    res.json(JSON.parse(req))
  })



  app.get("/posts", (req,res) => {
    posts.getAll(req,res)
  })



  app.get("/ping", (req,res) => {
    res.send("pdong")
  })

  app.get("/test"), auth.requiresLogin, (req,res) => {
    res.send("Backend")
  }

};