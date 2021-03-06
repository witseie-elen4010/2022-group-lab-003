'use strict'

const path = require('path')

function game(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'game.html'))
}

// module.exports =  game 

function about(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'about.html'))
}

// module.exports = { about }

function instructions(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'instructions.html'))
}

// module.exports = { instructions }

function options(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'options.html'))
}

// module.exports = { options }

function multiplayer(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'multiplayer.html'))
}

function multiplayer2(req, res) {
   res.sendFile(path.join(__dirname, '..', 'views', 'multiplayer2.html'))
}

module.exports = { multi: multiplayer, game: game, about: about, instructions: instructions, options: options, multi2: multiplayer2}