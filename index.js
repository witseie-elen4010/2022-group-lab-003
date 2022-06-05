'use strict'
// For routes and azure setup

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
const users = []
const bcrypt = require('bcrypt')
// app.use(express.urlencoded({ extened: false})) // tells us we want to access our inputs


app.use(mainRouter)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
      res.redict('/') //incase of a failure redirect back to main page i.e. login

   }
   console.log(users) //check when added a user into the game
})




module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)