const express = require('express')
const teachers = require('../controllers/teacher/index')
const students = require('../controllers/students/index')

const Router = express.Router()


Router.get('/', function(req, res){
    return res.redirect('/teacher')
})
Router.get('/teacher', teachers.index)

Router.get('/teacher', students.index)

module.exports = Router