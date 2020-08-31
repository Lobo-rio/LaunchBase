const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')
const crypto = require('crypto')
const { hash } = require('bcryptjs')
const mailer = require('../../../lib/mailer')

module.exports = {
    formLogin(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()
        res.redirect("/")
    },
    formForgot(req, res) {
        return res.render("session/forgot-password")
    },
    formReset(req, res) {
        return res.render("session/password-reset", { token: req.query.token })
    },
    async forgot(req, res) {

        try {
            const user = req.user

            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            const query = `
            UPDATE users SET
                reset_token = ($1),
                reset_token_expires = ($2)
            WHERE id = $3
            `
            const data = [
                token,
                now,
                user.id
            ]

            let params = { query, data }

            await optionsDb.update(params)

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de Senha',
                html: `
                <h2>Esqueceu a Senha?</h2>
                <p>Não se preocupe, clique no link abaixo, para recuperar sua senha.</p>
                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHAR
                    </a>
                </p>
            `
            })

            return res.render("session/forgot-password", {
                success: "Verifique seu email, para recuperar sua senha!"
            })

        } catch (error) {
            console.error(error)
            return res.render("session/forgot-password", {
                error: "Error inesperado, tente novamente!"
            })
        }

    },
    async reset(req, res) {
        const user = req.user
        const tokenClear = ""
        const { password, token } = req.body

        try {
            
            const newPassword = await hash(password, 8)

            const query = `
            UPDATE users SET
                password = ($1),
                reset_token = ($2),
                reset_token_expires = ($3)
            WHERE id = $4
            `
            const data = [
                newPassword,
                tokenClear,
                tokenClear,
                user.id
            ]

            let params = { query, data }
            await optionsDb.update(params)

            return res.render("session/login", {
                user: req.user,
                success: "A senha atualizada com sucesso, faça seu login!"
            })


        } catch (error) {
            console.error(error)
            return res.render("session/password-reset", {
                user: req.body,
                token,
                error: "Error inesperado, tente novamente! Controllers"
            })
        }
        
    }
}