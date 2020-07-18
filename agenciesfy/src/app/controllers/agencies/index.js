const { fieldsCreate, valuesCreate } = require('../../../lib/index')
const optionsDb = require('../../models/index')

module.exports = {
    async show(req, res) {
        let table = 'agencies'
        let params = [ table ]

        let results = await optionsDb.findAll(params)
        const agencies = results.rows
        
        if (!agencies) return res.send("Agency not found!!")
        res.render("agencies/show.njk", { agencies })
    },
    async create(req, res){
        let table = 'addresses'
        let params = [ table ]

        let results = await optionsDb.findAll(params)
        const addresses = results.rows
        
        if (!addresses) return res.send("Agency not found!!")
        res.render("agencies/create.njk", {addresses})
    },
    createAddress(req, res){
        res.render("agencies/create-address.njk")
    },
    async post(req, res){
        const table = 'agencies'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }
        const data = [
            req.body.name,
            req.body.cnpj,
            req.body.address_id
        ]

        const params = [
            table,
            fields,
            values,
            data
        ]

              
        let results = await optionsDb.save(params)

        return res.redirect(`/agencies`)
        
    },
    async postAddress(req, res){
        const table = 'addresses'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }

        const data = [
            req.body.street,
            req.body.number,
            req.body.complement,
            req.body.neighborhood,
            req.body.city,
            req.body.state,
            req.body.zipcode
        ]

        const params = [
            table,
            fields,
            values,
            data
        ]
        console.log(fields, values, data)
        let results = await optionsDb.save(params)

        return res.redirect(`/agencies`)
    }
}