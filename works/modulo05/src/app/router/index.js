const express = require('express')
const instructors = require('../controllers/instructors/index')
const members = require('../controllers/members/index')

const Router = express.Router();


Router.get("/", function(req, res){
    res.redirect("/instructors")
})

Router.get("/instructors", instructors.index)
Router.get("/instructors/create", instructors.create)
Router.get("/instructors/:id", instructors.show)
Router.get("/instructors/:id/edit", instructors.edit)
Router.post("/instructors", instructors.post)
Router.put("/instructors", instructors.put)
Router.delete("/instructors", instructors.delete)



Router.get("/members", members.index)
Router.get("/members/create", members.create)
Router.get("/members/:id", members.show)
Router.get("/members/:id/edit", members.edit)
Router.post("/members", members.post)
Router.put("/members", members.put)
Router.delete("/members", members.delete)

module.exports = Router