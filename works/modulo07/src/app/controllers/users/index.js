const optionsDb = require('../../moldes/index')
const { fieldsCreate, valuesCreate, formatCep, formatCpfCnpj } = require('../../../lib/utils')
const { hash } = require('bcryptjs')

module.exports = {
    formRegister(req, res) {
        res.render("users/register.njk")
    },
    async show(req, res) {
        const { user } = req
        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)

        return res.render("users/index", { user })
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

            params = { fields, values, table, data }

            const results = await optionsDb.save(params)
            const userId = results.rows[0].id

            req.session.userId = userId

            return res.redirect("/users")
        } catch (error) {
            console.error(error)
        }

    },
    async update(req, res) {
        try {
            const { user } = req
            let { id, name, email, cpf_cnpj, cep, address } = req.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            const query = `
                UPDATE users SET
                    name = ($1),
                    email = ($2),
                    cpf_cnpj = ($3),
                    cep = ($4),
                    address = ($5)
                WHERE id = $6
            `

            const data = [
                name,
                email,
                cpf_cnpj,
                cep,
                address,
                id
            ]

            params = { query, data }

            await optionsDb.update(params)
            return res.render("users/index", {
                user: req.body,
                success: "Conta atualizada com Sucesso!"
            })
            
        } catch (error) {
            console.error(error)
            return res.render("users/index", {
                error: "Houve um error no Update!"
            })
        }
    },
    delete(req, res) {

    }
}