'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const paths = require('./paths')
const db = require('../database/db.js')

mainRouter.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

mainRouter.get('/options', paths.options)

mainRouter.get('/game', paths.game)

mainRouter.get('/about', paths.about)

mainRouter.get('/instructions', paths.instructions)

mainRouter.get('/multiplayer', paths.multi)

mainRouter.get('/database', function (req, res) {
 
   

   // Make a query to the database
   db.pools
   // Run query
   .then((pool) => {
   return pool.request()
   .query(`SELECT * FROM Login; `) // INSERT INTO Login(username,password) VALUES('usernamesss','passworddd');`)
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

// mainRouter.post('/store-user-details', function(req,res) {
//    return res.redirect('login.js')
// })

module.exports = mainRouter
