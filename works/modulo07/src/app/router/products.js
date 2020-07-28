const express = require('express')
const products = require('../controllers/products/index')
const search = require('../controllers/search/index')
const multer = require('../middlewares/multer')

const Router = express.Router();

Router.get('/search', search.index)

Router.get("/create", products.create)
Router.get('/:id', products.show)
Router.get("/:id/edit", products.edit)

Router.post("/", multer.array("photos", 6), products.post)
Router.put("/", multer.array("photos", 6), products.put)
Router.delete("/", products.delete)

module.exports = Router