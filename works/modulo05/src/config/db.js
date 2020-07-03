const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '',
    host: '',
    port: 5432,
    database: ''
})