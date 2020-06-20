const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const about = require('./about')
const recipes = require('./recipes')
const message = require('./message')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res)=> {
    return res.render("index", {items: about, recipes: recipes})
})

server.get("/about", (req, res)=> {
    return res.render("about", {items: about, messages: message})
})

server.get("/recipes", (req, res)=>{
    return res.render("recipes", {items: recipes})
})

server.get("/recipesid", (req, res)=>{
    const id = req.query.id

    const recipe = recipes.find(function(menu){
        if (menu.cardId == id){
            return true
        }
    })

    if (!recipe) {
        return res.send('Recipe not found!')
    }

    return res.render("recipeid", {items: recipe})
})

server.listen(3000, ()=>{
    console.log('Server is running port 3000!')
})
