const express = require('express')
const nunjucks = require('nunjucks')
const Router = require("./router/index")
const methodOverride = require('method-override')
const session = require('./../config/session')

const server = express()

server.use(session)
server.use((req, res, next)=>{
    res.locals.session = req.session

    next()
})

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(Router)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, () => {
    console.log('Server is running 3000!')
})