const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    all(params) {
        const { table, options } = params
        return db.query(`
            SELECT * from ${table} ${options}
        `)
    },
    findBy(params) {
        const {id, table} = params
        return db.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    },
    findByAll(params) {
        const {id, idItems, table} = params
        return db.query(`SELECT * FROM ${table} WHERE ${idItems} = $1`, [id])
    },
    save(params) {

        const query = `
            INSERT INTO ${params[0]} (
                category_id,
                user_id,
                name,
                description,
                old_price,
                price,
                quantity,
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            params[1].category_id,
            params[1].user_id || 1,
            params[1].name,
            params[1].description,
            params[1].old_price || params[1].price,
            params[1].price,
            params[1].quantity,
            params[1].status || 1
        ]

        return db.query(query, values)
    },
    filesCreate({ filename, path, product_id }) {
        const query = `
            INSERT INTO files (
                name,
                path,
                product_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            product_id
        ]

        return db.query(query, values)
    },
    update(params) {
        const query = `
            UPDATE ${params[0]} SET
                category_id = ($1),
                user_id = ($2),
                name = ($3),
                description = ($4),
                old_price = ($5),
                price = ($6),
                quantity = ($7),
                status = ($8)
            WHERE id = $9
        `

        const values = [
            params[1].category_id,
            params[1].user_id,
            params[1].name,
            params[1].description,
            params[1].old_price,
            params[1].price,
            params[1].quantity,
            params[1].status,
            params[1].id
        ]

        return db.query(query, values)
    },
    async delete(params) {

        try {
            const result = await db.query(`SELECT * FROM ${params[1]} WHERE id = $1`, [params[0]])
            const file = result.rows[0]

            fs.unlinkSync(file.path)
            return db.query(`DELETE FROM ${params[1]} WHERE id = $1`, [params[0]])
        } catch (error) {
            console.error(error)
        }
        
    },
    search(params) {
        const { filter, category, table } = params

        let query = "",
            filterQuery = `WHERE`

        if (category) {
            filterQuery = `${filterQuery}
                ${table}.category_id = ${category}
                AND`
        }

        filterQuery = `
            ${filterQuery}
            ${table}.name ilike '%${filter}%'
            OR ${table}.description ilike '%${filter}%'
        `
        query = `
            SELECT ${table}.*, 
            categories.name AS category_name
            FROM ${table}
            LEFT JOIN categories ON (categories.id = ${table}.category_id)
            ${filterQuery}
        `

        return db.query(query)
    }
}