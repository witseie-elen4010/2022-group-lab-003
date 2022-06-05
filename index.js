'use strict'
// For routes and azure setup

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
let users = []
const bcrypt = require('bcrypt')
const db = require('./database/db.js')
//const main = require('./public/scripts/main.js')

import { checkInput } from './public/scripts/main'

app.use(mainRouter)

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', mainRouter)
app.use('/public/stylesheets',express.static(__dirname + '/public/stylesheets'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))
app.use('/database', express.static(__dirname + '/database'))
app.use('/routes', express.static(__dirname + '/routes'))

app.post('/', async function (req, res) { //login to send data to the database tables
   
   let user = req.body.username
   let pass = req.body.password
   
   // Make a query to the database
    db.pools
    // Run query
    .then((pool) => {
    return pool.request()
    .query(`INSERT INTO UserLogin(USERNAME,PASSWORD) VALUES('${user}',HASHBYTES('MD5','${pass}'));`) //database stores the hashed password
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

 // keyboard CLICK input
 document.addEventListener('keyup', (event) => {

   let keyInput = String(event.key)

   if (keyInput === 'Enter') {
      checkInput
      return
   }

})

module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
