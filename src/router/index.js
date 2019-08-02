var express = require('express')
const allRoutes = () => {
  var app = express.Router()
  app.use('/categories', require('./categories')());
  return app
}

module.exports = allRoutes;