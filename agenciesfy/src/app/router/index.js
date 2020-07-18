const express = require('express')
const Router = express.Router()
const agencies = require('../controllers/agencies/index')
const cars = require('../controllers/cars/index')

Router.get('/', function(req, res) {
    res.render("index.njk")
})


Router.get('/agencies', agencies.show)
Router.get('/agencies/create', agencies.create)
Router.get('/agencies/address', agencies.createAddress)
Router.post('/agencies', agencies.post)
Router.post('/agencies/address', agencies.postAddress)

Router.get('/cars/show', cars.show)
Router.get('/cars/create', cars.create)
Router.get('/cars/models/create', cars.createModels)

module.exports = Router