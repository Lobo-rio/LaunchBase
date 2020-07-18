const express = require('express')
const Router = express.Router()
const agencies = require('../controllers/agencies/index')
const cars = require('../controllers/cars/index')
const customers = require('../controllers/customers/index')

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
Router.get('/cars/:id/edit', cars.edit)
Router.post('/cars', cars.post)
Router.post('/cars/models', cars.postModels)
Router.put('/cars', cars.update)
Router.delete('/cars', cars.delete)

Router.get('/customers/show', customers.show)
Router.get('/customers/create', customers.create)
Router.get('/customers/:id/edit', customers.edit)
Router.post('/customers', customers.post)
Router.put('/customers', customers.update)
Router.delete('/customers', customers.delete)

module.exports = Router