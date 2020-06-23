const express = require('express')
const nunjucks = require('nunjucks')
const Router = require("./router/index")

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(Router)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, () => {
    console.log('Server is running 3000!')
})