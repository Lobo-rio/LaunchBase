const optionsDb = require('../moldes/index')
const { compare } = require('bcryptjs')


async function login(req, res, next) {
    const { email, password } = req.body
    const table = 'users'

    const user = await optionsDb.findOne(table, { where: { email } })

    if (!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário ou Senha não encontrado!"
    })

    const passed = await compare(password, user.password)
    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Usuário ou Senha não encontrado!"
    })

    req.user = user
    next()
}

async function forgot(req, res, next) {
    const { email } = req.body
    const table = 'users'

    try {
        let user = await optionsDb.findOne(table, { where: { email } })

        if (!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "E-Mail não encontrado!"
        })

        req.user = user

        next()
    } catch (error) {
        console.error(error)
        return res.render("session/forgot-password", {
            error: "Erro inesperado!"
        })
    }
}

async function reset(req, res, next){
    const { email, password, passwordRepeat, token } = req.body
    const table = 'users'

    try {
        let user = await optionsDb.findOne(table, { where: { email } })

        if (!user) return res.render("session/password-reset", {
            user: req.body,
            token,
            error: "E-Mail não encontrado!"
        })

        if (password != passwordRepeat) return res.render("session/password-reset", {
            user: req.body,
            token,
            error: 'A senha e a repetição de senha, estão diferentes!'
        })

        if (token != user.reset_token) return res.render("session/password-reset", {
            user: req.body,
            token,
            error: 'Token inválido, favor solicitar uma nova recuperação de senha!'
        })

        let now = new Date()
        now = now.setHours(now.getHours())

        if (now > user.reset_token_expires) return res.render("session/password-reset", {
            user: req.body,
            token,
            error: 'Token expirado, favor solicitar uma nova recuperação de senha!'
        })

        req.user = user

        next()
    } catch (error) {
        console.error(error)
        return res.render("session/forgot-password", {
            error: "Erro inesperado!"
        })
    }
}

module.exports = { login, forgot, reset }