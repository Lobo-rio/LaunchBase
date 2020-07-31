const optionsDb = require('../../moldes/index')
const { fieldsCreate, valuesCreate, formatPrice, date } = require('../../../lib/utils')

module.exports = {
    async show(req, res) {
        let params = {}
        const id = req.params.id
        let table = 'products'

        params.id = id
        params.table = table

        let results = await optionsDb.findBy(params)
        const product = results.rows[0]

        if (!product) return res.send("Product not found!!")

        const { day, month, hour, minutes } = date(product.updated_at)

        product.published = {
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}`
        }

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        params = {}
        table = 'files'
        idItems = 'product_id'

        params.id = id
        params.idItems = idItems
        params.table = table

        results = await optionsDb.findByAll(params)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        res.render("products/show.njk", { product, files })
    },
    create(req, res) {
        let params = {},
            table = 'categories',
            options = ''

        params.table = table
        params.options = options

        optionsDb.all(params)
            .then(
                function (results) {
                    const categories = results.rows
                    return res.render("products/create.njk", { categories })
                }
            )
    },
    async edit(req, res) {
        let params = {},
            table = 'products',
            options = '',
            idItems = ''
        const id = req.params.id

        params.id = id
        params.table = table

        let results = await optionsDb.findBy(params)
        const product = results.rows[0]

        if (!product) return res.send("Product not found!!")

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        params = {}
        table = 'categories'

        params.table = table
        params.options = options

        results = await optionsDb.all(params)
        const categories = results.rows

        params = {}
        table = 'files'
        idItems = 'product_id'

        params.id = id
        params.idItems = idItems
        params.table = table

        results = await optionsDb.findByAll(params)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("products/edit.njk", { product, categories, files })

    },
    async post(req, res) {

        try {
            const keys = Object.keys(req.body)
            let fields = fieldsCreate(req.body)
                values = valuesCreate(fields)
                table = 'products'
                params = {}

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("products/create.njk", {
                        product: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            req.body.price = req.body.price.replace(/\D/g, "")

            const data = [
                req.body.category_id,
                req.body.name,
                req.body.description,
                req.body.price,
                req.body.quantity
            ]

            params = { fields, values, table, data }

            if (req.files.length == 0) {
                return res.render("products/create.njk", {
                    product: req.body,
                    error: 'Por favor, selecione uma ou mais imagens!'
                })
            }

            let results = await optionsDb.save(params)
            const productId = results.rows[0].id

            const filesPromise = req.files.map(file => optionsDb.filesCreate({ ...file, product_id: productId }))
            await Promise.all(filesPromise)

            return res.redirect(`/products/${productId}/edit`)
        } catch (error) {
            console.error(error)
        }

    },
    async put(req, res) {
        const keys = Object.keys(req.body)
        let params = {}
            id = req.body.id
            table = 'products'

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.render("products/edit.njk", {
                    product: req.body,
                    error: 'Por favor, preencher todo os campos!'
                })
            }
        }

        if (req.files.length != 0) {
            const filesPromise = req.files.map(file => optionsDb.filesCreate({ ...file, product_id: req.body.id }))
            await Promise.all(filesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)
            const table = "files"

            const removedFilesPromise = removedFiles.map(id => optionsDb.delete(params = [id, table]))

            await Promise.all(removedFilesPromise)
        }

        req.body.price = req.body.price.replace(/\D/g, "")

        if (req.body.old_price != req.body.price) {
            params = { id, table }
            const oldProduct = await optionsDb.findBy(params)
            req.body.old_price = oldProduct.rows[0].price
        }


        const query = `
            UPDATE products SET
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

        const data = [
            req.body.category_id,
            req.body.user_id,
            req.body.name,
            req.body.description,
            req.body.old_price,
            req.body.price,
            req.body.quantity,
            req.body.status,
            id
        ]

        params = { query, data }
        await optionsDb.update(params)

        return res.redirect(`/products/${req.body.id}`)
    },
    async delete(req, res) {
        let table = 'products'
            id = req.body.id
            params = {}
            
        params = { id, table }

        await optionsDb.delete(params)

        return res.redirect("/")
    }
}