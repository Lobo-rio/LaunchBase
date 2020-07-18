const { fieldsCreate, valuesCreate } = require('../../../lib/index')
const optionsDb = require('../../models/index')

module.exports = {
    async show(req, res){
        let table = 'cars'
        let params = [ table ]

        let results = await optionsDb.findAll(params)
        const cars = results.rows
        if (!cars) return res.send("Cars not found!!")

        table = 'models'
        params = [ table ]

        results = await optionsDb.findAll(params)
        const models = results.rows
        if (!models) return res.send("Cars not found!!")
        res.render("cars/show.njk", { cars, models })
    },
    async create(req, res){
        let table = 'models'
        let params = [ table ]

        let results = await optionsDb.findAll(params)
        const models = results.rows
        
        if (!models) return res.send("Models not found!!")
        res.render("cars/create.njk", { models })
    },
    createModels(req, res){
        res.render("cars/createModels.njk")
    },
    async edit(req, res){
        const id = req.params.id
        let table = 'cars'
        let params = [ id, table ]

        let results = await optionsDb.findBy(params)
        const car = results.rows[0]
        if (!car) return res.send("Car not found!!")

        table = 'models'
        params = [ table ]

        results = await optionsDb.findAll(params)
        const models = results.rows
        if (!models) return res.send("Car not found!!")

        res.render("cars/edit.njk", { car, models })
    },
    async post(req,res){
        const table = 'cars'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }
        const data = [
            req.body.models_id,
            req.body.name,
            req.body.plate
        ]

        const params = [
            table,
            fields,
            values,
            data
        ]

              
        let results = await optionsDb.save(params)

        return res.redirect(`/cars/show`)
    },
    async postModels(req, res){
        const table = 'models'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }
        const data = [
            req.body.color,
            req.body.motorization,
            req.body.doors,
            req.body.automatic,
            req.body.description
        ]

        const params = [
            table,
            fields,
            values,
            data
        ]

              
        let results = await optionsDb.save(params)

        return res.redirect(`/cars/show`)
    },
    async update(req, res) {
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }
        const query = `
            UPDATE cars SET
                models_id = ($1),
                name = ($2),
                plate = ($3)
            WHERE id = $4
        `

        const data = [
            req.body.models_id,
            req.body.name,
            req.body.plate,
            req.body.id
        ]

        const params = [
            query,
            data
        ]
              
        let results = await optionsDb.update(params)

        return res.redirect(`/cars/show`)
    },
    async delete(req, res){
        const query = `DELETE FROM cars WHERE id = $1`
        const params = [
            query,
            req.body.id
        ]

        console.log(params)
        let results = await optionsDb.delete(params)

        return res.redirect(`/cars/show`)
    }
}