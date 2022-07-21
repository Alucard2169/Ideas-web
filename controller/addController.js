const { Idea } = require('../model/messageModel');
const moment = require('moment');
 

module.exports.idea_get = (req, res) => {
    Idea.find()
        .then((result) => {
           
            res.render('index',{ideaList:result, moment: moment})
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports.addNew_get = (req, res) => {
    res.render('new')
};

module.exports.getIdea_id = (req, res) => {
    const id = req.params.id;
    Idea.findById(id)
        .then((result) => {
            res.render('idea', {idea: result, moment: moment})
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports.addNew_post = (req, res) => {
    
    const idea = new Idea(req.body);
    idea.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })
}