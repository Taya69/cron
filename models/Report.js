const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const reportSchema = new Schema({
    date: {
        type: Date,
        require: true        
    },
    Data: {
        type: Array,
        require: true        
    },
 
})

module.exports = mongoose.model('reports', reportSchema)