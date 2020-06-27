const express = require('express')
const nunjucks = require('nunjucks')
const router = require('./routers/index')

const server = express()

server.use(express.static('public'))
server.use(router)
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})




server.listen(3000, function(){
    console.log('Server Running port 3000!')
})