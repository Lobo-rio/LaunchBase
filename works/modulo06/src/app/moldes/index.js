const db = require('../../config/db')

module.exports = {
    all(params){
        return db.query(`
            SELECT * from ${params[0]}
        `)
    }
}