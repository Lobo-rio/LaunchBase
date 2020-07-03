const { fieldsCreate, valuesCreate } = require('../../../lib/index')
const options = require('../../models/index')

module.exports = {
    index(req, res){
        return res.render('teachers/index')
    },
    create(req, res){
    
        return res.render('teachers/create')
    },
    update(req,res){
        return res.render('teachers/update')
    },
    show(req, res){
        const id = req.params.id
        const table = 'teachers'

        options.find(table, id, function(teacher) {
            return res.render('teachers/show', { teacher })
        })
    },
    post(req, res){
        const table = 'teachers'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)

        const data = [
            req.body.name,
            req.body.email,
            req.body.discipline,
            req.body.experience,
            req.body.uf,
            req.body.city,
            req.body.avatar_url
        ]
        console.data
        options.save(table, data, fields, values, function(teacher) {
            console.log(teacher)
            return res.redirect(`/teachers/${teacher.id}`)
        })


        
    }
}