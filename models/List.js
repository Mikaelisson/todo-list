const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
})

module.exports = mongoose.model("List", listSchema)