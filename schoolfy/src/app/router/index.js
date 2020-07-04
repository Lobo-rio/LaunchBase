const express = require('express')
const teachers = require('../controllers/teacher/index')
const students = require('../controllers/students/index')

const Router = express.Router()


Router.get('/', function(req, res){
    return res.redirect('/teachers')
})
Router.get('/teachers', teachers.index)
Router.get('/teachers/create', teachers.create)
Router.get('/teachers/update/:id', teachers.update)
Router.get('/teachers/:id', teachers.show)

Router.post('/teachers', teachers.post)
Router.put('/teachers', teachers.put)
Router.delete('/teachers', teachers.delete)

Router.get('/students', students.index)
Router.get('/students/create', students.create)
Router.get('/students/update/:id', students.update)
Router.get('/students/:id', students.show)

Router.post('/students', students.post)
Router.put('/students', students.put)
Router.delete('/students', students.delete)

module.exports = Router