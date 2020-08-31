const express = require('express')
const users = require('../controllers/users/index')
const session = require('../controllers/session/index')
const userValidator = require('../validators/user')
const sessionValidator = require('../validators/session')
const { isLoggedRedirectToUsers, onlyUsers } = require('../middlewares/session')

const Router = express.Router();

Router.get('/login', isLoggedRedirectToUsers, session.formLogin)
Router.post('/login',sessionValidator.login, session.login)
Router.post('/logout', session.logout)

Router.get('/forgot-password', session.formForgot)
Router.get('/password-reset', session.formReset)
Router.post('/forgot-password', sessionValidator.forgot, session.forgot)
Router.post('/password-reset', sessionValidator.reset, session.reset)

Router.get('/register', users.formRegister)
Router.post('/register', userValidator.post, users.create)

Router.get('/', onlyUsers, userValidator.show, users.show)
Router.put('/', userValidator.update, users.update)
Router.delete('/', users.delete)

module.exports = Router