const { fieldsCreate, valuesCreate, date } = require('../../../lib/index')
const options = require('../../models/index')

module.exports = {
    index(req, res){
        const table = 'teachers'
        const fields = '*'
        const condition = 'ORDER BY name'

        options.all(table, fields, condition, function(teachers){
            return res.render('teachers/index', { teachers })
        })
    },
    create(req, res){
        return res.render('teachers/create')
    },
    update(req,res){
        const id = req.params.id
        const table = 'teachers'

        options.find(table, id, function(teacher) {
            teacher.experience = date(teacher.experience).iso
            return res.render('teachers/update', { teacher })
        })
        
    },
    show(req, res){
        const id = req.params.id
        const table = 'teachers'

        options.find(table, id, function(teacher) {
            teacher.serviceTime = date(teacher.experience).serviceTime
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
            req.body.experience = date(req.body.experience).iso,
            req.body.uf,
            req.body.city,
            req.body.avatar_url
        ]
        
        options.save(table, data, fields, values, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    put(req, res){
        const table = 'teachers'
        const id = Number(req.body.id)
        const query = `
        UPDATE ${table} SET
        name = ($1),
        email = ($2),
        discipline = ($3),
        experience = ($4),
        uf = ($5),
        city = ($6),
        avatar_url = ($7)
        WHERE id = $8
        `
        const data = [
            req.body.name,
            req.body.email,
            req.body.discipline,
            req.body.experience = date(req.body.experience).iso,
            req.body.uf,
            req.body.city,
            req.body.avatar_url,
            id
        ]

        options.update(query, data, function() {
            return res.redirect(`/teachers/${id}`)
        })
    },
    delete(req, res){
        const id = Number(req.body.id)
        const table = 'teachers'
        const query = `DELETE FROM ${table} WHERE id = $1`

        options.delete(query, id, function(){
            return res.redirect('/')
        })
    }
}