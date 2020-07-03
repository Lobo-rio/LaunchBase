const express = require('express')
const teachers = require('../controllers/teacher/index')
const students = require('../controllers/students/index')

const Router = express.Router()


Router.get('/', function(req, res){
    return res.redirect('/teachers')
})
Router.get('/teachers', teachers.index)
Router.get('/teachers/create', teachers.create)
Router.get('/teachers/update', teachers.update)
Router.get('/teachers/:id', teachers.show)

Router.get('/students', students.index)

module.exports = Router