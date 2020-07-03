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
        return res.render('teachers/show')
    }
}