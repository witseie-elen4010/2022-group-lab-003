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

module.exports = mainRouter
