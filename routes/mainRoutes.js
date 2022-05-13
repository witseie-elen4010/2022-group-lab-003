'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'game.html'))
})

mainRouter.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'about.html'))
})

mainRouter.get('/instructions', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'instructions.html'))
})

module.exports = mainRouter
