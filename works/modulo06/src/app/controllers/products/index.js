const optionsDb = require('../../moldes/index')

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
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
    }
}