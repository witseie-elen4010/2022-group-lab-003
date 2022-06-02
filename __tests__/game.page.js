'use strict'

const { Builder, By, Key, util } = require('selenium-webdriver')
var assert = require('assert')

describe('Game page tests for elements', () => {
   test('Game page opened and keyboard is displayed', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/game')

      let expectedKeyboard =
         'Q\nW\nE\nR\nT\nY\nU\nI\nO\nP\nA\nS\nD\nF\nG\nH\nJ\nK\nL\nDEL\nZ\nX\nC\nV\nB\nN\nM\nENTER'
      let actualKeyboard = await driver
         .findElement(By.id('keyboard'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(actualKeyboard, expectedKeyboard)

      driver.close()
   })
})
