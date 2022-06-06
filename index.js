'use strict'

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
let users = []
const loginValidator = require('./public/scripts/login.js')
const db = require('./database/db.js')
const LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./scratch');

app.use(mainRouter)
// socket additions:
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app) // create server with express app
const io = socketio(server)

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', mainRouter)

app.use('/public/stylesheets',express.static(__dirname + '/public/stylesheets'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))
app.use('/database', express.static(__dirname + '/database'))
app.use('/routes', express.static(__dirname + '/routes'))

app.post('/', async function (req, res) { //login to send data to the database tables
   
   let user = req.body.username
   let pass = req.body.password
   if((loginValidator.usernameFunc(user)&&loginValidator.passwordFunc(pass))===true){
     // console.log('YES') //debugging
    // Make a query to the database
    db.pools
    // Run query
    .then((pool) => {
    return pool.request() //multiple table query. Replace 'hello' with actual guess
    .query(`INSERT INTO UserLogin(USERNAME,PASSWORD) VALUES('${user}',HASHBYTES('MD5','${pass}'));`) 
    })
    // redirect after login to the game
    .then(res.redirect('/options'))
    // If there's an error, return that with some description
    .catch(err => {
    res.send({
    Error: err
    })
    })
   } else{
    console.error('Invalid username and password')
   }
 })

//  app.get('/game', async function (req, res) { //login to send data to the database tables
//    // retrieve word from localStorage
//     let key = 'word'
//     let n = '5'
//     let keyN = key.concat(n)
//     let word = JSON.parse(localStorage.getItem('word5'))
//     console.log(word)
//    // Make a query to the database
//    db.pools
//    // Run query
//    .then((pool) => {
//    return pool.request() //multiple table query. Replace 'hello' with actual guess
//    .query(`SELECT 1`) 
//    })
//    // redirect after login to the game
//    .then(res.redirect('/options'))
//    // If there's an error, return that with some description
//    .catch(err => {
//    res.send({
//    Error: err
//    })
//    })
  
// })

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



  // ignore more than 3 players entering the multi player mode

  connections[playerIndex] = true

  // tell everyone what player number just connected
  socket.broadcast.emit('player-connection', playerIndex)

  // handle disconnections
  socket.on('disconnect', () => {
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

  socket.on('ChosenWord', inputWord=> {
    console.log(inputWord)
    socket.broadcast.emit('NewWord', inputWord)
  })

  // recieving colour array of each player
  socket.on('IdentifyingPlayer', ({ playerNum, colourArray }) => {
    let playerNum1 = playerNum
    let colourArray1 = colourArray
    socket.broadcast.emit('IdentifyingPlayerColours', ({ playerNum1, colourArray1}))
  })

  socket.on('CheckWinner', playerNum => {

    socket.broadcast.emit('Winner', playerNum)
  })
})
