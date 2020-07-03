const express = require('express')
const nodemon = require('nodemon')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const router = require('./app/router/index')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(router)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views',{
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, function(){
    console.log('Running server at port 3000!')
})