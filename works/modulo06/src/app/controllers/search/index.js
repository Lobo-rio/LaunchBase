const optionsDb = require('../../moldes/index')
const { formatPrice, date } = require('../../../lib/utils')

module.exports = {
    async index(req, res) {
        try {
            let table = 'products',
                params = {}

            const { filter, category } = req.query

            if (!filter)  return res.redirect("/")

            params.filter = filter
            params.table = table

            if (category) {
                params.category = category
            }

            results = await optionsDb.search(params)

            async function getImage(productId) {
                const params = {}
                const id = productId
                const table = 'files'
                const idItems = 'product_id'

                params.id = id
                params.idItems = idItems
                params.table = table
    
                let results = await optionsDb.findByAll(params)
                const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
    
                return files[0]
            }

            const productsPromise = results.rows.map(async product => {
                product.img = await getImage(product.id)
                product.oldPrice = formatPrice(product.old_price)
                product.price = formatPrice(product.price)
                return product
            })

            const products = await Promise.all(productsPromise)

            const search = {
                term: req.query.filter,
                total: products.length
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {

                const found = categoriesFiltered.some(cat => cat.id == category.id)

                if (!found) categoriesFiltered.push(category)

                return categoriesFiltered
            },[])

            return res.render("search/index.njk", { products, search, categories})
        } catch (error) {
            console.error(error)
        }
    }
}