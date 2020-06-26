const fs = require('fs')
const data = require('../../data.json')
const { age, date } = require('../../utils')


exports.index = function(req, res) {
    res.render("members/index.njk", {members: data.members})
}

exports.create = function(req, res){
    res.render("members/create.njk")
}

exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    birth = Date.parse(req.body.birth)

    const lastMember = data.members[data.members.length - 1]
    let id = 1

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect(`/members/${id}`)
    })
}

exports.show = function(req, res){
    const { id } = req.params

    const foundMembers = data.members.find(function(members){
        return members.id == id
    })

    if(!foundMembers) return res.send("Members not found!")

    const members = {
        ...foundMembers,
        birthDay: date(foundMembers.birth).birthDay
    }

    res.render("members/show.njk", { members })
}


exports.edit = function(req, res){
    const { id } = req.params

    const foundMembers = data.members.find(function(members){
        return members.id == id
    })

    if(!foundMembers) return res.send("Members not found!")

    const member = {
        ...foundMembers,
        birth: date(foundMembers.birth).iso
    }

    date(foundMembers.birth)

    res.render("members/edit.njk", { member })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMembers = data.members.find(function(members, foundIndex){
        if(id == members.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundMembers) return res.send("Members not found!")

    const members = {
        ...foundMembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = members

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(members){
        return members.id != id
    })
    
    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect("/members")
    })
}