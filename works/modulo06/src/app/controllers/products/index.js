const optionsDb = require('../../moldes/index')
const { formatPrice } = require('../../../lib/utils')

module.exports = {
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

        return res.render("products/edit.njk", { product, categories })

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

        let results = await optionsDb.save(params)
        const productId = results.rows[0].id

        return res.redirect(`/products/${productId}`)
    },
    async put(req, res) {
        const keys = Object.keys(req.body)
        let params = []
        let table = 'products'
                    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Please, fill all fields!!`)
            }
        }

        req.body.price =  req.body.price.replace(/\D/g,"")

        if (req.body.old_price != req.body.price) {
            params = [ req.body.id, table ]
            const oldProduct = await optionsDb.findBy(params)
            req.body.old_price = oldProduct.rows[0].price
        }
        
        params = [ table, req.body ]
        await optionsDb.update(params)

        return res.redirect(`/products/${req.body.id}/edit`)
    },
    async delete(req, res){
        const table = 'products'
        const params = [ req.body.id, table ]

        await optionsDb.delete(params)

        return res.redirect("/")
    }
}