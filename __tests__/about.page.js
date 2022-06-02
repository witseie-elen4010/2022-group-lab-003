'use strict'

const { Builder, By, Key, util } = require('selenium-webdriver')
var assert = require('assert')

describe('About page tests', () => {
   test('About page opened after clicking About button on Game page', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/game')

      await driver.findElement(By.xpath('(//*[@id="linkButton"])[1]')).click()

      let expectedHeadingAboutPage = 'About'
      let actualHeadingAboutPage = await driver
         .findElement(By.xpath('//h1'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(actualHeadingAboutPage, expectedHeadingAboutPage)

      driver.close()
   })
})
