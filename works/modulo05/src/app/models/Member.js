const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM members ORDER BY name`, function(err, results) {
            if(err) throw `All Database error! - ${err}`
            
            callback(results.rows)   
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            instructor
        ]
        
        db.query(query, values, function(err, results) {
            if(err) throw `Create Database error! - ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT members.*, instructors.name AS instructor_name 
        FROM members 
        LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1`, [id], function(err, results){
            if(err) throw `Find Database error! - ${err}`

            callback(results.rows[0])
        })
    },
    put(data, callback){
        const query = `
            UPDATE members SET
            avatar_url = ($1),
            name = ($2),
            email = ($3),
            birth = ($4),
            gender = ($5),
            blood = ($6),
            weight = ($7),
            height = ($8),
            instructor_id = ($9)
        WHERE id = $10
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `UPDate Database error! - ${err}`

            return callback()
        })
        
    },
    delete(id, callback){
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results){
            if(err) throw `DELETE Database error! - ${err}`

            return callback()
        })
    },
    instructorSelectOptions(callback){
        db.query(`SELECT id, name FROM instructors`, function(err, results){
            if(err) throw `Instructor Select Options Database error! - ${err}`

            return callback(results.rows)
        })
    }

}