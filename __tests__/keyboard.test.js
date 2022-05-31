'use strict'
/* eslint-env jest */

// const jsdom = require('jsdom')
// const { JSDOM } = jsdom
// const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>')
// global.window = dom.window
// global.document = window.document
const keyboard = require('../public/scripts/keyboardFunc')

// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')

// const router = require('../routes/mainRoutes')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/', router)

describe('Test keyboard function algorithm', () => {
   test('insertLetter function inserts letter into word', () => {
      let guess = []
      guess.push('a')
      expect(keyboard.insertLetter('a')).toStrictEqual(guess)
   })

   test('deleteLetter function removes letter from word', () => {
      let guess = []
      guess.push('a')
      guess.push('b')

      let testerGuess = []
      testerGuess.push('a')
      expect(keyboard.deleteLetter(guess)).toStrictEqual(testerGuess)
   })
})
