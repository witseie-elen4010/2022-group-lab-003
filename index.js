'use strict'

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./routes/mainRoutes')
app.use(mainRouter)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', mainRouter)
app.use('/cdn', express.static('public'))

module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)



 