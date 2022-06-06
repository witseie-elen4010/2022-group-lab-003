'use strict'

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
const bcrypt = require('bcrypt')
const db = require('./database/db.js')
const LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./scratch');

app.use(mainRouter)

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', mainRouter)
app.use('/public/stylesheets',express.static(__dirname + '/public/stylesheets'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))
app.use('/database', express.static(__dirname + '/database'))
app.use('/routes', express.static(__dirname + '/routes'))

app.post('/', async function (req, res) { 
   //login to send data to the database tables
   let user = req.body.username
   let pass = req.body.password

   // Make a query to the database
    db.pools
    // Run query
    .then((pool) => {
    return pool.request() 
    .query(`INSERT INTO UserLogin(USERNAME,PASSWORD) VALUES('${user}',HASHBYTES('MD5','${pass}'));`) 
    })
    // redirect after login to the game
    .then(res.redirect('/options'))
    // If there's an error, return that with some description
    .catch(err => {
    res.send({
    Error: err
    })
    })
   
 })

 app.post('/', async function (req, res) { 
   // send words inputted by players into database
        let user = req.body.username
        
        // retrieve word from localStorage
        let key = 'word'
        let n = '5'
        let keyN = key.concat(n)
        let word = JSON.parse(localStorage.getItem(keyN)) 
     
        // Make a query to the database
         db.pools
         // Run query
         .then((pool) => {
         return pool.request() //multiple table query.
         .query(`INSERT INTO GameLogDetails(USERNAME,INPUT_WORD) VALUES('${user}','${word}');`) 
         })
         // redirect after login to the game
         .then(res.redirect('/options'))
         // If there's an error, return that with some description
         .catch(err => {
         res.send({
         Error: err
         })
         })
        
})

module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
