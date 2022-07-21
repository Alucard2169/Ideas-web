const mongoose = require('mongoose');


const userEntrySchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    idea: {
        type: String,
        require: true
    },
    time: {
        type: String
    }
}, { timestamps: true })


const Idea = mongoose.model('Idea', userEntrySchema);
module.exports = {Idea}