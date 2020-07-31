const express = require('express')
const categories = require('../controllers/categories/index')

const Router = express.Router()


Router.get('/', categories.show)
Router.get('/create', categories.create)
Router.get('/:id/edit', categories.edit)
Router.post('/', categories.post)
Router.put('/', categories.update)
Router.delete('/', categories.delete)

module.exports = Router