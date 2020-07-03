const db = require('../../config/db')

module.exports = {
    all(table, fields, condition, callback){
        db.query(`
            SELECT ${fields} 
            FROM ${table}
            ${condition}
        `, function(err, results){
            if (err) throw `FindAll Database error! => ${err}`

            callback(results.rows)
        })

    },
    find(table, id, callback){
        db.query(`SELECT * FROM ${table} WHERE id = $1`, [id], function(err, results){
            if(err) throw `Find Database error! => ${err}`

            callback(results.rows[0])
        })
    },
    save(table, data, fields, values, callback){
        const query = `
            INSERT INTO ${table} (${fields})
            VALUES (${values})
            RETURNING id
        `
        
        db.query(query, data, function(err, results){
            if (err) throw `Create Database error! => ${err}`

            return callback(results.rows[0])
        })
    },
    update(){
        

        
    },
    delete(){

    },
    readGroup(){

    }
}