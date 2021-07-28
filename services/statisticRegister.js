const StatisticRegister = require('../models/StatisticRegister')
const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
const keys = require('../config/keys')
const User = require('../models/User')
const reportController = require('../controllers/report')
const Report = require('../models/Report')

module.exports.addEntry = async function(register, date, sex, user) {    
    const entry = new StatisticRegister({
        register: register,
        date: date,
        sex: sex,
        user: user
    }) 
    try {
        await entry.save();
    } 
    catch(e) {
        console.log(e)
    }  
 }

 module.exports.makeReport = async function() {
 let method = ''
 let arr = []  
 const requestForMethod = axios(`${keys.url}setting`)
 requestForMethod.then(data => method = data.data.methodOfSaving)
  axios(`${keys.url}report`).then(data => {
   for (let i = 0; i < data.data.length; i++) {   
   getuserById(data.data[i][0].user).then(user => {
    let latestLogin = getLatestLogin(data.data[i])
    let updateFrequency = getUpdateFrequency(data.data[i])
    let sex = data.data[i][0].sex ? 'male': 'female'
    let email = user.email
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let strForRecordInFile = `user: ${user.email}, latest login: ${latestLogin}, 
    friquency of update: ${updateFrequency}, sex: ${sex}`
    if (method === 'file') {      
        if (i === 0) {
            fs.writeFileSync(`D:/${day}.${month}.txt`, strForRecordInFile)
        } else {    
            fs.appendFileSync(`D:/${day}.${month}.txt`, `\n${strForRecordInFile}`);
        }
    }
    if (method === 'base') {
        arr.push(strForRecordInFile)
        if (i === data.data.length -1) {
            let arr2 = arr.slice()
                const report = new Report({
                    date: new Date(),
                    data: arr2
                })
             try {
                 report.save()
             } 
             catch (e) {
                 console.log(e)
             }  
            }
    }
  
   })  
   }   
})
 }
 function getLatestLogin (arrayOfRegister) {
    let arrOfLogin = arrayOfRegister.filter(el => el.register === 'login').sort((a, b)=> {
        if (a.date > b.date) return 1
        if (a.date < b.date) return -1
        return 0
    })    
    let latestLogin = arrOfLogin[arrOfLogin.length-1] 
    return latestLogin.date
 }
 function getUpdateFrequency (arrayOfRegister) {
 let dateOfRegister = new Date(arrayOfRegister.find(el => el.register === 'register').date) 
 let updateSum = arrayOfRegister.filter(el => el.register === 'update').length;
 let currentDate = new Date();
 let period = Math.ceil(Math.abs(currentDate.getTime() - dateOfRegister.getTime()) / (1000 * 3600 * 24));
 //console.log(period, updateSum, arrayOfRegister[0].user)
   return `${updateSum} in ${period} days`
 }

 async function getuserById(id) {
    let user = await User.findById(id)
    return user
 }
