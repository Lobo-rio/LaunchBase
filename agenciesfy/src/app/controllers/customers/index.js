const { fieldsCreate, valuesCreate, date } = require('../../../lib/index')
const optionsDb = require('../../models/index')

module.exports = {
    async show(req, res){
        let table = 'customers'
        let params = [ table ]

        let results = await optionsDb.findAll(params)
        const customers = results.rows
        if (!customers) return res.send("Customers not found!!")       
        res.render("customers/show.njk", { customers })
    },
    create(req, res){
        res.render("customers/create.njk")
    },
    async edit(req, res){
        const id = req.params.id
        let table = 'customers'
        let params = [ id, table ]

        let results = await optionsDb.findBy(params)
        const client = results.rows[0]
        if (!client) return res.send("Client not found!!")

        client.birth_day = date(client.birth_day).iso

        res.render("customers/edit.njk", { client })
    },
    async post(req,res){
        const table = 'customers'
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
            req.body.cpf,
            req.body.birth_day,
            req.body.phone
        ]

        const params = [
            table,
            fields,
            values,
            data
        ]
              
        let results = await optionsDb.save(params)
        return res.redirect(`/customers/show`)
    },
    async update(req, res) {
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }
        const query = `
            UPDATE customers SET
                name = ($1),
                cpf = ($2),
                birth_day = ($3),
                phone = ($4)
            WHERE id = $5
        `

        const data = [
            req.body.name,
            req.body.cpf,
            req.body.birth_day,
            req.body.phone,
            req.body.id
        ]

        const params = [
            query,
            data
        ]
              
        let results = await optionsDb.update(params)

        return res.redirect(`/customers/show`)
    },
    async delete(req, res){
        const query = `DELETE FROM customers WHERE id = $1`
        const params = [
            query,
            req.body.id
        ]

        console.log(params)
        let results = await optionsDb.delete(params)

        return res.redirect(`/customers/show`)
    }
}