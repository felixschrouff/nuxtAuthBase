const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Import App-configs
require('../app/config/passport')(passport);
require('../app/config/express')(app, passport);


//ROUTES
require('../app/config/routes')(app, passport);



async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port, instanceName } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, instanceName)
  consola.ready({
    message: `Server "${instanceName}" listening on http://${host}:${port}`,
    badge: true
  })
}
start()
