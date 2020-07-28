const express = require('express')
const home = require('../controllers/home/index')
const products = require('./products')
const users = require('./users')

const Router = express.Router();

Router.get("/", home.index)

Router.use('/products', products)
Router.use('/users', users)

Router.get("/ads/create", function(req, res){
    res.redirect("/products/create")
})

Router.get("/accounts", function(req, res){
    res.redirect("/users/register")
})

module.exports = Router