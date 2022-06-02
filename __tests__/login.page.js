'use strict'

const { Builder, By, Key, util } = require('selenium-webdriver')
var assert = require('assert')

describe('Login page heading tests for Login, Options and Game pages', () => {
   test('Login page opened and heading is correct', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      let expectedTitle = 'M U L T I - Wordle'
      let actualTitle = await driver
         .findElement(By.xpath('//h1'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Options page opened and heading is correct', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/options')

      let expectedTitle = 'M U L T I - Wordle'
      let actualTitle = await driver
         .findElement(By.xpath('//h1'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Game page opened and heading is correct', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/game')

      let expectedTitle = 'M U L T I - Wordle'
      let actualTitle = await driver
         .findElement(By.xpath('//h1'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })
})
