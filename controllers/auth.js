const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const events = require('events')
const statisticRegisterService = require('../services/statisticRegister')
//const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {  
    const candidate = await User.findOne({email: req.body.email})    
    if (candidate) {    
        let passwordResult = bcrypt.compareSync(req.body.password, candidate.password) || req.body.password === candidate.password ? true : false
        if (passwordResult) {        
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            statisticRegisterService.addEntry('login', new Date(), candidate.sex, candidate._id)
            res.status(201).json({token: `Bearer ${token}`, user: candidate})
        } else{
            res.status(401).json({
                message: "you entered unvalid password"
            })
        }
    } else {    
        res.status(401).json({
            message: "that user is not found"
        })
    }
}

module.exports.register = async function(req, res) {
   const candidate = await User.findOne({
       email: req.body.email
   })
   if (candidate) {
       res.status(409).json({
           message: "that email is occupied"
       })
   } else {
       const salt = bcrypt.genSaltSync(10)
       const password = req.body.password
    const user = new User ({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
        sex: req.body.sex,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })    
    try {
        await user.save();
        statisticRegisterService.addEntry('register', new Date(), user.sex, user._id)
        res.status(201).json(user)
    } catch(e) {
        errorHandler(res, e)
    }    
   }    
}

module.exports.getUserById = async function(req, res) {
    try
    {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }  
     catch(e) {
         errorHandler(res, e)
     }    
} 
module.exports.upDateUser = async function(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set : req.body},
            {new : true}
            )
    statisticRegisterService.addEntry('update', new Date(), user.sex, user._id)        
    res.status(200).json(user)
}
    catch {
        errorHandler(res, e)
    }
  }     
  module.exports.getUsers = async function(req, res) {
    try {
        const users = await User.find()           
    res.status(200).json(users)
}
    catch (e) {
        errorHandler(res, e)
    }
  }     
 

