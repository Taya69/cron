const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const events = require('events')
const statisticRegisterService = require('../services/statisticRegister')
const Entrie = require('../models/StatisticRegister')
const Settings = require('../models/Settings')
//const errorHandler = require('../utils/errorHandler')

module.exports.generalReport = async function(req, res) {       
       const entries = await Entrie.find()
       const array = grouppingByUser(entries)
       res.status(200).json(array)   
}
function grouppingByUser (data) {
    let arr = []
    let arr2 = []
    arr2.push(data[0])
    for (let i = 1; i < data.length; i++) {                       
        if (String(data[i].user) === String(data[i-1].user)) {         
           arr2.push(data[i])
        } else {           
           let arrCopy = arr2.slice()
            arr.push(arrCopy);
            arr2.length = 0
            arr2.push(data[i])          
        }
        if (i === data.length - 1) {
            arr.push(arr2)
        }        
    }
    return arr
}

module.exports.updateOfSettings = async function (req, res) {
    try {
        const settings = await Settings.findOneAndUpdate(
            {_id: req.params.id},
            {$set : req.body},
            {new : true}
            )
    res.status(200).json(settings)
}
    catch {
        errorHandler(res, e)
    }
}
module.exports.getSettings = async function (req, res) {
    try {
        const setting = await Settings.findOne()
    res.status(200).json(setting)
}
    catch {
        errorHandler(res, e)
    }
}





