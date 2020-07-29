const optionsDb = require('../moldes/index')

async function post(req, res, next) {
    const keys = Object.keys(req.body)
    let table = 'users'

    for (key of keys) {
        if (req.body[key] == "") {
            return res.render("users/register.njk", {
                user: req.body,
                error: 'Por favor, preencher todo os campos!'
            })
        }
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

module.exports = { post }