'use strict'
// For routes and azure setup

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
let users = []
const bcrypt = require('bcrypt')
const db = require('./database/db.js')

app.use(mainRouter)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', mainRouter)
app.use('/public/stylesheets',express.static(__dirname + '/public/stylesheets'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))
app.use('/database', express.static(__dirname + '/database'))
app.use('/routes', express.static(__dirname + '/routes'))

app.post('/',async (req,res) => {
   try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10) // standard default value
      users.push({
         username: req.body.username,
         password: hashedPassword //hased password to store in our database because it is safer
      })
      res.redirect('/options')
   } catch {
      res.redirect('/') //incase of a failure redirect back to main page i.e. login

   }
   console.log(users) //check when added a user into the game
})

app.get('/database', function (req, res) { //when you go into /database it updates the database
   
   let user = users.username
   let pass = users.password
   // Make a query to the database
    db.pools
    // Run query
    .then((pool) => {
    return pool.request()
    .query(`INSERT INTO Login(username, password) VALUES('${user}','${pass}');`)
    })
    // Send back the result
    .then(result => {
    res.send(result)
    })
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