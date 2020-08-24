const express = require('express')
const users = require('../controllers/users/index')
const session = require('../controllers/session/index')
const validators = require('../validators/index')

const Router = express.Router();

Router.get('/login', session.formLogin)
Router.post('/login', session.login)
Router.post('/logout', session.logout)

Router.get('/forgot-password', session.formForgot)
Router.get('/password-reset', session.formReset)
Router.post('/forgot-password', session.forgot)
Router.post('/password-reset', session.reset)

Router.get('/register', users.formRegister)
Router.post('/register', validators.post, users.create)

Router.get('/', validators.show, users.show)
Router.put('/', validators.update, users.update)
Router.delete('/', users.delete)

module.exports = Router