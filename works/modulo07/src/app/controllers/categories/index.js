const optionsDb = require('../../moldes/index')
const { fieldsCreate, valuesCreate } = require('../../../lib/utils')

module.exports = {
    async show(req, res) {
        try {
            let table = 'categories'
            options = ''
            params = {}

            params = { table, options }

            const results = await optionsDb.all(params)
            const categories = results.rows

            return res.render("categories/show.njk", { categories })
        } catch (error) {
            console.log(error)
        }

    },
    create(req, res) {
        return res.render("categories/create.njk")
    },
    async edit(req, res) {
        try {
            let id = req.params.id
            table = 'categories'
            params = {}

            params = { id, table }

            const results = await optionsDb.findBy(params)
            const category = results.rows[0]

            return res.render("categories/edit.njk", { category })
        } catch (error) {
            console.log(error)
        }

    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)
            let table = 'categories'
            fields = fieldsCreate(req.body)
            values = valuesCreate(fields)
            params = {}

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("categories/create.njk", {
                        category: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const data = [req.body.name]

            params = { fields, values, table, data }

            const results = await optionsDb.save(params)
            const category = results.rows[0].id

            res.redirect("/categories")
        } catch (error) {
            console.log(error)
        }

    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body)
            let id = req.body.id

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("categories/create.njk", {
                        category: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const query = `
            UPDATE categories SET 
                name = ($1)
            WHERE id = $2
        `
            const data = [
                req.body.name,
                id
            ]

            params = { query, data }

            await optionsDb.update(params)

            return res.redirect('/categories')
        } catch (error) {
            console.log(error)
        }

    },
    async delete(req, res) {
        try {
            let table = 'categories'
            id = req.body.id
            params = {}

            params = { id, table }

            await optionsDb.deleteItems(params)

            return res.redirect("/categories")
        } catch (error) {
            console.log(error)
        }
    }
}