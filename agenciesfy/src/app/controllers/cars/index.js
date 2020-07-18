const { fieldsCreate, valuesCreate } = require('../../../lib/index')
const optionsDb = require('../../models/index')

module.exports = {
    findAll(req, res){

    },
    findBy(req, res){

    },
    show(req, res){
        res.render("cars/show.njk")
    },
    create(req, res){
        res.render("cars/create.njk")
    },
    createModels(req, res){
        res.render("cars/createModels.njk")
    },
    post(req,res){

    }
}