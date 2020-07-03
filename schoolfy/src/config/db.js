const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '12filhos14@',
    host: '127.0.0.1',
    port: 5432,
    database: 'school_maneger'
})