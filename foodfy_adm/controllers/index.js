exports.index = function(req, res){
    return res.render("index")
}

exports.create = function(req, res) {
    return res.render("create")
}

exports.post = function(req, res) {
    res.send("Aqui dentro no post!")
}