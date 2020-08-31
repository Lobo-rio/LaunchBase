const express = require('express')
const products = require('../controllers/products/index')
const search = require('../controllers/search/index')
const multer = require('../middlewares/multer')

const { onlyUsers } = require('../middlewares/session')

const Router = express.Router();

Router.get('/search', search.index)

Router.get("/create", onlyUsers, products.create)
Router.get('/:id', products.show)
Router.get("/:id/edit", onlyUsers, products.edit)

Router.post("/", onlyUsers, multer.array("photos", 6), products.post)
Router.put("/", onlyUsers, multer.array("photos", 6), products.put)
Router.delete("/", onlyUsers, products.delete)

module.exports = Router