const express = require('express');
//const passport = require('passport')
const parserBody = require('body-parser')
const mongo = require('mongoose')
const cron = require('node-cron')
const shell = require('shelljs')
const authRout = require('./routes/auth')
const userRout = require('./routes/user')
const reportRout = require('./routes/report')
const settingRout = require('./routes/settings')
const statisticRegister = require('./services/statisticRegister')

const keys = require('./config/keys')
const multer = require('multer');

const app = express()

const events = require('events')

cron.schedule('0 22 * * *', ()=> {
    statisticRegister.makeReport()
   // if(shell.exec('dir').code !== 0){'something go wrong'}
})
mongo.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=> console.log('all is good'))
.catch((e)=> console.log(e))


app.use(parserBody.urlencoded({extended : true}));
app.use(parserBody.json())

app.use('/api/auth', authRout)
app.use('/api/user', userRout)
app.use('/api/report', reportRout)
app.use('/api/setting', settingRout)

app.use(require('cors')())
app.use(require('morgan')('dev'))

//app.use(passport.initialize())

//require('./midleware/passport')(passport)
//app.use(express.static('./public'));

app.use(multer);

app.use(express.static(__dirname));
//app.use(express.static('public'));

const emitter = new events.EventEmitter();

emitter.on('addEntry', statisticRegister.addEntry)

module.exports = app