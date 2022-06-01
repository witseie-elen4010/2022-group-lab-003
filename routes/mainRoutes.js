'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()


mainRouter.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

mainRouter.get('/options', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'options.html'))
})

mainRouter.get('/game', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'game.html'))
})

mainRouter.get('/about', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'about.html'))
})

mainRouter.get('/instructions', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'instructions.html'))
})

mainRouter.get('/multiplayer', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'multiplayer.html'))
})

module.exports = mainRouter
