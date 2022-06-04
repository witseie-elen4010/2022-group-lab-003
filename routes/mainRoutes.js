'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const paths = require('./paths')
const db = require('../database/db.js')
//const app = express()

let bodyParser = require('body-parser')
mainRouter.use(bodyParser.json())
mainRouter.use(bodyParser.urlencoded({extended:true}))


mainRouter.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

mainRouter.get('/options', paths.options)

mainRouter.get('/game', paths.game)

mainRouter.get('/about', paths.about)

mainRouter.get('/instructions', paths.instructions)

mainRouter.get('/multiplayer', paths.multi)

mainRouter.get('/database', function (req, res) {
   
   let user = 'tests185',
       pass = '148Password' 
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

//  mainRouter.post('/', function (req, res) {
   
//    let user = 'testingLC'//res.send(req.body.username)
//    let pass = '1324PasWs'//req.body.password
   
//    // Make a query to the database
//    db.pools
//    // Run query
//    .then((pool) => {
//    return pool.request()
//    .query(`INSERT INTO Login(username, password) VALUES('${user}','${pass}');`)
//    })
//    // Send back the result
//    .then(result => {
//    res.send(result)
//    })
//    // If there's an error, return that with some description
//    .catch(err => {
//    res.send({
//    Error: err
//    })
//    })
// })

module.exports = mainRouter
