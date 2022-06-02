'use strict'

const { Builder, By, Key, util } = require('selenium-webdriver')
var assert = require('assert')

describe('Instruction page tests', () => {
   test('Instruction page opened after clicking instructions button on Game page', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/game')

      await driver.findElement(By.xpath('(//*[@id="linkButton"])[2]')).click()

      let expectedHeadingInstructionsPage = 'Multi-Wordle Instructions'
      let actualHeadingInstructionsPage = await driver
         .findElement(By.xpath('//h1'))
         .getText()
         .then(function (value) {
            return value
         })

      assert.equal(
         actualHeadingInstructionsPage,
         expectedHeadingInstructionsPage
      )

      driver.close()
   })
})
