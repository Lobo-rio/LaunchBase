const express = require('express')
const Router = express.Router()
const agencies = require('../controllers/agencies/index')

Router.get('/', function(req, res) {
    res.render("index.njk")
})

Router.get('/agencies/show', agencies.show)


module.exports = Router