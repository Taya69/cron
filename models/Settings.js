const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const settingsSchema = new Schema({
    methodOfSaving: {
        type: String,
        require: true        
    }   
})

module.exports = mongoose.model('settings', settingsSchema)