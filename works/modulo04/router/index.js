const express = require('express')
const Router = express.Router();


Router.get("/", (req, res)=>{
    res.redirect("/instructors")
})

Router.get("/instructors", (req, res)=> {
    res.render("instructors/index.njk")
})

Router.get("/members", (req, res)=> {
    res.render("members/index.njk")
})

module.exports = Router