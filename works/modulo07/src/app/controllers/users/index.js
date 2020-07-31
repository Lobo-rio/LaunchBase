const optionsDb = require('../../moldes/index')
const { fieldsCreate, valuesCreate  } = require('../../../lib/utils')
const { hash } = require('bcryptjs')

module.exports = {
    formRegister(req, res) {
        res.render("users/register.njk")
    },
    async show(req, res) {
        let table = 'users'
            options = ''
            params = {}

        params = { table, options }

        const results = await optionsDb.all(params)
        const users = results.rows

        return res.render("users/show.njk", { users })
    },
    async create(req, res) {

        try {
            delete req.body.passwordRepeat;
            let fields = fieldsCreate(req.body),
                values = valuesCreate(fields),
                table = 'users'
                params = {}

            const passwordHash = await hash(req.body.password, 8)

            const data = [
                req.body.name,
                req.body.email,
                passwordHash,
                req.body.cpf_cnpj.replace(/\D/g, ""),
                req.body.cep.replace(/\D/g, ""),
                req.body.address
            ]

            params = { fields, values, data }

            const results = await optionsDb.save(params)
            const userId = results.rows[0].id

            return res.redirect("/users")
        } catch (error) {
            console.error(error)
        }

    },
    update(req, res) {

    },
    delete(req, res) {

    }
}