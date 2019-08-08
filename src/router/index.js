var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  // app.use('/categories', require('./categories')());
  app.use('/products', require('./products')());
  app.use('/jobs', require('./jobs')());

  return app
}

module.exports = allRoutes;