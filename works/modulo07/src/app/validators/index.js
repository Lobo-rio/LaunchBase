const optionsDb = require('../moldes/index')

async function post(req, res, next) {
    const keys = Object.keys(req.body)
    let table = 'users'

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Please, fill all fields!!`)
        }
    }

    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await optionsDb.findOne(table, {
        WHERE: { email },
        OR: { cpf_cnpj }
    })

    if (user) return res.send('Users exists!')

    if (password != passwordRepeat) return res.send('Password Mismatch!')
}

module.exports = { post }