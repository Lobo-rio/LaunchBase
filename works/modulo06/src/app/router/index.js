const express = require('express')
const home = require('../controllers/home/index')
const products = require('../controllers/products/index')
const multer = require('../middlewares/multer')

const Router = express.Router();


Router.get("/", home.index)

Router.get("/products/create", products.create)
Router.get('/products/:id', products.show)
Router.get("/products/:id/edit", products.edit)

Router.post("/products", multer.array("photos", 6), products.post)
Router.put("/products", multer.array("photos", 6), products.put)

Router.delete("/products", products.delete)


Router.get("/ads/create", function(req, res){
    res.redirect("/products/create")
})


module.exports = Router