'use strict'

const { Builder, By, Key, util } = require('selenium-webdriver')
var assert = require('assert')

describe('Login page click tests', () => {
   test('Clicking the Log in button does not allow user to go to the Options page without username and password', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })
})
