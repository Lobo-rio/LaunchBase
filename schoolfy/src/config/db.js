const { Pool } = require('pg')

module.exports = new Pool({
    user: '',
    password: '',
    host: '127.0.0.1',
    port: 5432,
    database: ''
})