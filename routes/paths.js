'use strict'

const path = require('path')

function about (req, res) { res.sendFile(path.join(__dirname, '..', 'views', 'about.html')) }

module.exports = { about }
