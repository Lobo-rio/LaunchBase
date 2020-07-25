const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')

module.exports = {
    async show(req, res){
        const id = req.params.id
        let table = 'products'
        let params = [ id, table ]

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

        table = 'files'
        idItems = 'product_id'
        params = [id, idItems, table]

        results = await optionsDb.findByAll(params)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        res.render("products/show.njk", { product, files })
    },
    create(req, res){
        let table = 'categories'
        let params = [
            table
        ]

        optionsDb.all(params)
            .then(
                function(results){
                    const categories = results.rows
                    return res.render("products/create.njk", { categories })
                }
            )
    },
    async edit(req, res){
        const id = req.params.id
        let table = 'products'
        let params = [ id, table ]

        let results = await optionsDb.findBy(params)
        const product = results.rows[0]
        
        if (!product) return res.send("Product not found!!")
        
        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        table = 'categories'
        params = [ table ]

        results = await optionsDb.all(params)
        const categories = results.rows

        table = 'files'
        idItems = 'product_id'
        params = [id, idItems, table]

        results = await optionsDb.findByAll(params)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render("products/edit.njk", { product, categories, files })

    },
    async post(req, res) {
        const keys = Object.keys(req.body)
        let table = 'products'
        
        req.body.price =  req.body.price.replace(/\D/g,"")
        
        const params = [ table, req.body ]

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }

        if (req.files.length == 0) return res.send('Please, send at least one image!')

        let results = await optionsDb.save(params)
        const productId = results.rows[0].id

        const filesPromise = req.files.map(file => optionsDb.filesCreate({...file, product_id: productId}))
        await Promise.all(filesPromise)

        return res.redirect(`/products/${productId}/edit`)
    },
    async put(req, res) {
        const keys = Object.keys(req.body)
        let params = []
        let table = 'products'
                    
        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send(`Please, fill all fields!!`)
            }
        }

        if (req.files.length != 0){
            const filesPromise = req.files.map(file => optionsDb.filesCreate({...file, product_id: req.body.id}))
            await Promise.all(filesPromise)
        }

        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)
            const table = "files"

            const removedFilesPromise = removedFiles.map(id => optionsDb.delete(params = [id, table]))
            
            await Promise.all(removedFilesPromise)
        }

        req.body.price =  req.body.price.replace(/\D/g,"")

        if (req.body.old_price != req.body.price) {
            params = [ req.body.id, table ]
            const oldProduct = await optionsDb.findBy(params)
            req.body.old_price = oldProduct.rows[0].price
        }
        
        params = [ table, req.body ]
        await optionsDb.update(params)

        return res.redirect(`/products/${req.body.id}`)
    },
    async delete(req, res){
        const table = 'products'
        const params = [ req.body.id, table ]

        await optionsDb.delete(params)

        return res.redirect("/")
    }
}