const routes = require('express').Router();

routes.get('/', (req,res) => {
    res.sendStatus(200)
})
routes.use('/auth', require('./auth'));


module.exports = routes;