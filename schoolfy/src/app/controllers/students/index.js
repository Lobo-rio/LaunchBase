const { fieldsCreate, valuesCreate, date } = require('../../../lib/index')
const options = require('../../models/index')

module.exports = {
    index(req, res){
        const table = 'students'
        const fields = '*'
        const condition = 'ORDER BY name'

        options.all(table, fields, condition, function(students){
            return res.render('students/index', { students })
        })
    },
    create(req, res) {
        const table = 'teachers'
        const fields = 'id, name'
        const condition = 'ORDER BY name'

        options.all(table, fields, condition, function(teachers){
            return res.render('students/create', { teachers })
        })
    },
    update(req, res){
        const id = Number(req.params.id)
        const students = 'students'

        options.find(students, id, function(student){
            const teachers = 'teachers'
            const fields = 'id, name'
            const condition = 'ORDER BY name'

            student.age = date(student.age).iso
            options.all(teachers, fields, condition, function(teachers){
                return res.render('students/update', { student, teachers })
            })
        })
        
    },
    show(req, res){
        const id = Number(req.params.id)
        const table = 'students'

        options.find(table, id, function(student){
            student.age = date(student.age).birthDay
            return res.render('students/show', { student })
        })
    },
    post(req, res){
        const table= 'students'
        const fields = fieldsCreate(req.body)
        const values = valuesCreate(fields)

        const data = [
            req.body.avatar_url,
            req.body.name,
            req.body.email,
            req.body.class,
            req.body.age,
            req.body.teacher_id
        ]

        options.save(table, data, fields, values, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },
    put(req, res){
        const table = 'students'
        const id = Number(req.body.id)

        const query = `
        UPDATE ${table} SET
        avatar_url = ($1),
        name = ($2),
        email = ($3),
        class = ($4),
        age = ($5),
        teacher_id = ($6)
        WHERE id = $7
        `
        const data = [
            req.body.avatar_url,
            req.body.name,
            req.body.email,
            req.body.class,
            req.body.age,
            req.body.teacher_id,
            id
        ]

        options.update(query, data, function() {
            return res.redirect(`/students/${id}`)
        })
    },
    delete(req, res){
        const id = Number(req.body.id)
        const table = 'students'
        const query = `DELETE FROM ${table} WHERE id = $1`

        options.delete(query, id, function(){
            return res.redirect('/students')
        })
    }
}