const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')

module.exports = {
    async index(req, res) {
        let params = {}
        const table = 'products'
        const options = 'ORDER BY updated_at DESC'

        params.table = table
        params.options = options
        
        let results = await optionsDb.all(params)
        const products = results.rows

        if (!products) return res.send('Products not founds!')

        async function getImage(productId) {
            let params = {}
            const table = 'files'
            const idItems = 'product_id'
            
            params.id = productId
            params.idItems = idItems
            params.table = table

            let results = await optionsDb.findByAll(params)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const productsPromise = products.map(async product => {
            product.img = await getImage(product.id)
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
            return product
        }).filter((product, index) => index > 2 ? false : true )

        const lastAdded = await Promise.all(productsPromise)
        return res.render("home/index.njk", { products: lastAdded })
    }
}