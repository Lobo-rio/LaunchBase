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
    update(query, data, callback){
        db.query(query, data, function(err, results){
            if (err) throw `Update Database error! => ${err}`

            return callback(results.rows[0])
        })
    },
    delete(query, id, callback){
        db.query(query, [id], function(err, results){
            if(err) throw `Delete Database error! => ${err}`

            return callback()
        })
    },
    paginate(params){
        const { 
            countTable, 
            table, 
            ids, 
            fields, 
            leftJoin, 
            groupBy, 
            filter, 
            limit, 
            offset, 
            callback 
        } = params

        let query = "",
            filterQuery = "",
            totalQuery = `
            (SELECT count(*) FROM ${table[0]}) AS total
            `

        if ( filter ){
            filterQuery = `
            WHERE ${table[0]}.${fields[0]} ILIKE '%${filter}%'
            OR ${table[0]}.${fields[1]} ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM ${table[0]}
                ${filterQuery}
            ) AS total`
        }


        if (countTable){
            query += `
                SELECT ${table[0]}.*, ${totalQuery}, count(${table[1]}) AS total_${table[1]} 
                FROM ${table[0]}
            `
        } else {
            query += `
                SELECT ${table[0]}.*, ${totalQuery} 
                FROM ${table[0]}
            `
        }

        if (leftJoin) {
            query += `
            LEFT JOIN students ON (${table[0]}.${ids[0]} = ${table[1]}.${ids[1]}) 
            `
        }

        query += `${filterQuery}`
        
        if (groupBy){
            query += `
                GROUP BY ${table[0]}.${ids[0]} LIMIT $1 OFFSET $2
            `
        }else{
            query += `
                LIMIT $1 OFFSET $2
            `
        }
        
        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Paginate Database error! => ${err}`

            callback(results.rows)
        })
    }
}