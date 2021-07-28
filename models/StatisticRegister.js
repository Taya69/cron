const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const statisticRegisterSchema = new Schema({
    register: {
        type: String,
        require: true,
        unique: false
    },
    date: {
        type: Date,
        require: true,
        unique: false
    },
    sex: {
        type: Boolean
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        require: false,        
        unique: false
    }   
})

module.exports = mongoose.model('statisticRegister', statisticRegisterSchema)