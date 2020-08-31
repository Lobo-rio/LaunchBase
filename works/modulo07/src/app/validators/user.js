const optionsDb = require('../moldes/index')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
    const keys = Object.keys(body)
    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor, preencher todo os campos!'
            }
        }
    }
}

async function show(req, res, next) {
    const { userId: id } = req.session
    const table = 'users'

    const user = await optionsDb.findOne(table, { where: { id } })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado!"
    })

    req.user = user

    next()
}

async function post(req, res, next) {
    let table = 'users'
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
        return res.render("user/register", fillAllFields)
    }

    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await optionsDb.findOne(table, {
        WHERE: { email },
        OR: { cpf_cnpj }
    })

    if (user) return res.render("users/register.njk", {
        user: req.body,
        error: 'Usuário já está cadastrado!'
    })

    if (password != passwordRepeat) return res.render("users/register.njk", {
        user: req.body,
        error: 'A senha e a confirmação da senha, estão diferentes!'
    })

    next()
}

async function update(req, res, next) {
    let table = 'users'
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
        return res.render("users/index", fillAllFields)
    }

    const { id, password } = req.body

    if (!password) return res.render("users/index", {
        user: req.body,
        error: "Coloque sua senha para atualizar seu cadastro!"
    })

    const user = await optionsDb.findOne(table, { where: {id} })

    const passed = await compare(password, user.password)
    if(!passed) return res.render("users/index", {
        user: req.body,
        error: "Senha incorreta!"
    })

    req.user = user
    next()
}

module.exports = { post, show, update }