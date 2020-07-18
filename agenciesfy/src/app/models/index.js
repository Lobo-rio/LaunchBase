const db = require('../../config/db')

module.exports = {
    findAll(params){
        return db.query(`SELECT * FROM ${params[0]}`)
    },
    findBy(params){
        return db.query(`SELECT * FROM ${params[1]} WHERE id = $1`, [params[0]])
    },
    save(params) {
        const query = `
            INSERT INTO ${params[0]}
            (${params[1]}) VALUES (${params[2]})
            RETURNING id
        `
        return db.query(query, params[3])
    },
    update(params){
        return db.query(params[0], params[1])
    },
    delete(params){
        return db.query(params[0], [params[1]])
    }
}