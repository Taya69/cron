const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    sex: {
        type: Boolean
    },
    role: {
        type: String,
        require: false,
        unique: false
    },
    firstName: {
        type: String,
        require: true,
        unique: false
    },
    lastName: {
        type: String,
        require: true,
        unique: false
    },
   
})

module.exports = mongoose.model('users', userSchema)