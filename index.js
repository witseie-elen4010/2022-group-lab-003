'use strict'
// For routes and azure setup

const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const mainRouter = require('./routes/mainRoutes')
app.use(mainRouter)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', mainRouter)
app.use('/public/stylesheets', express.static(__dirname + '/public/stylesheets'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))

module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
