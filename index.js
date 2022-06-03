'use strict'
// For routes and azure setup

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
app.use(mainRouter)
// socket additions:
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app) // create server with express app
const io = socketio(server)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', mainRouter)
app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
) // sets the static folders that the server serves to the client
app.use('/public/scripts', express.static(__dirname + '/public/scripts')) // scripts hold all game files
app.use('/database', express.static(__dirname + '/database'))
app.use('/routes', express.static(__dirname + '/routes')) // folder holds routes to html files viewed by the client
module.exports = app

const port = process.env.PORT || 3000
// app.listen(port)
// console.log('Express server running on port', port)

// start server
server.listen(port, () => console.log(`Server running on port ${port}`))

const connections = [null, null, null] // arrray to keep track of 3 connections anything after we are going to ignore and that player can play in single player mode or wait until a player disconnects
// handle a socket connection request from the client
io.on('connection', socket => { // socket is the client connected
  // console.log('New socket connection')
  // find an available player number
  let playerIndex = -1
   for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i
      break
    }
  }

  // tell the connecting client what player number they are
  socket.emit('player-number', playerIndex) // message
  if (playerIndex == -1) {
    return
  }

  console.log(`Player ${playerIndex} has connected`)

  // ignore more than 3 players entering the multi player mode


  connections[playerIndex] = true

  // tell everyone what player number just connected
  socket.broadcast.emit('player-connection', playerIndex)

  // handle disconnections
  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} has disconnected`)
    connections[playerIndex] = null

    // tell everyone what player number just disconnected
    socket.broadcast.emit('player-connection', playerIndex)
  })

  // player connections
  socket.on('check-players', () => {
    const players = []
    for (const i in connections) {
      connections[i] === null
? players.push({ connected: false }) 
         : players.push({ connected: true })
    }
    socket.emit('check-players', players)
  })
})
