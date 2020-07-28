const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')

module.exports = {
    formRegister(req, res) {
        res.render("users/register.njk")
    },
    show(req, res) {

    },
    async post(req, res) {
        

        return res.send('Passed!')


    },
    update(req, res) {

    },
    delete(req, res) {

    }
}