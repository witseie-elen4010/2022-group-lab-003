'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('./database/db.js')

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'game.html'))
})

mainRouter.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'about.html'))
})

mainRouter.get('/instructions', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'instructions.html'))
})

mainRouter.get('/database', function (req, res) {
  // Make a query to the database
  db.pools
  // Run query
  .then((pool) => {
  return pool.request()
  // This is only a test query, change it to whatever you need
  .query('SELECT 1')
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
  


module.exports = mainRouter
