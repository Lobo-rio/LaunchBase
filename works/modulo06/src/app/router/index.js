const express = require('express')
const products = require('../controllers/products/index')

const Router = express.Router();


Router.get("/", function(req, res){
    res.render("layout.njk")
})
Router.get("/products/create", products.create)
Router.get("/products/:id/edit", products.edit)
Router.post("/products", products.post)
Router.put("/products", products.put)
Router.delete("/products", products.delete)


Router.get("/ads/create", function(req, res){
    res.redirect("/products/create")
})


module.exports = Router