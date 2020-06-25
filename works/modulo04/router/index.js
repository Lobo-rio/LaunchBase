const express = require('express')
const instructors = require('../instructors')

const Router = express.Router();


Router.get("/", function(req, res){
    res.redirect("/instructors")
})

Router.get("/instructors", function(req, res) {
    res.render("instructors/index.njk")
})

Router.get("/instructors/create", function(req, res){
    res.render("instructors/create.njk")
})

Router.get("/instructors/:id", instructors.show)

Router.get("/instructors/:id/edit", instructors.edit)

Router.post("/instructors", instructors.post)

Router.put("/instructors", instructors.put)

Router.delete("/instructors", instructors.delete)

Router.get("/members", function(req, res) {
    res.render("members/index.njk")
})

module.exports = Router