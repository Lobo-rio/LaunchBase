const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')

module.exports = {
    async index(req, res) {
        const table = 'products'
        const options = 'ORDER BY updated_at DESC'

        const params = [table, options]

        let results = await optionsDb.all(params)
        const products = results.rows

        if (!products) return res.send('Products not founds!')

        async function getImage(productId) {
            const table = 'files'
            const idItems = 'product_id'
            const params = [productId, idItems, table]

            let results = await optionsDb.findByAll(params)
            const files = results.rows
            files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const productsPromise = products.map(product => {
            product.img = await getImage(product.id)
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
            return product
        })

        const lastAdded = await Promise.all(productsPromise)

        return res.render("home/index.njk", { products: lastAdded })
    }
}