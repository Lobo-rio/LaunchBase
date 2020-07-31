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
        const { id, table } = params
        return db.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    },
    findByAll(params) {
        const { id, idItems, table } = params
        return db.query(`SELECT * FROM ${table} WHERE ${idItems} = $1`, [id])
    },
    async findOne(table, filters) {
        let query = `SELECT * FROM ${table}`

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },
    async save(params) {

        const { fields, values, table, data } = params

        const query = `
            INSERT INTO ${table} (${fields}) VALUES (${values})
            RETURNING id
        `

        return await db.query(query, data)
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
        const { query, data } = params

        return db.query(query, data)
    },
    async deleteItems(params) {

        try {
            let { id, table } = params
            await db.query(`DELETE FROM ${table} WHERE id = $1`, [id])
        } catch (error) {
            console.error(error)
        }

    },
    async delete(params) {

        try {
            let { id, table } = params
            const result = await db.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
            const file = result.rows[0]

            if (table == 'products') {
                fs.unlinkSync(file.path)
                return db.query(`DELETE FROM ${table} WHERE id = $1`, [id])
            }
        } catch (error) {
            console.error(error)
        }

    },
    search(params) {
        try {
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
        } catch (error) {
            console.error(error)
        }
    }
}