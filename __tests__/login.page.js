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

   test('Clicking the Log in button does not allow user to go to the Options page with incorrect password (only 3 letters)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('testing')
      driver.findElement(By.id('password')).sendKeys('czk')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Clicking the Log in button does not allow user to go to the Options page with incorrect password (only lowercase and uppercase)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('testing')
      driver.findElement(By.id('password')).sendKeys('czkABDCD')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Clicking the Log in button does not allow user to go to the Options page with incorrect password (lowercase, uppercase, 1 number, length<8)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('testing')
      driver.findElement(By.id('password')).sendKeys('czkABD1')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Clicking the Log in button does not allow user to go to the Options page with incorrect username (length<3)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('te')
      driver.findElement(By.id('password')).sendKeys('czkABDcsa1')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Clicking the Log in button does not allow user to go to the Options page with incorrect username (length>30)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver
         .findElement(By.id('username'))
         .sendKeys('testingtestingtestingtestingtesting')
      driver.findElement(By.id('password')).sendKeys('czkABDcsa1')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Multi-Wordle Login Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Double clicking the Log in button allows user to go to the Options page with correct password (lowercase, uppercase, 1 number, length=8)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('testing')
      driver.findElement(By.id('password')).sendKeys('czkABD1T')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()
      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Options Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })

   test('Double clicking the Log in button allows user to go to the Options page with correct password (lowercase, uppercase, 1 number, length>8)', async function () {
      let driver = await new Builder().forBrowser('chrome').build()
      await driver.get('https://multi-wordle.azurewebsites.net/')

      driver.findElement(By.id('username')).sendKeys('testing')
      driver.findElement(By.id('password')).sendKeys('czkABD1JHRTfas')

      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()
      await driver.findElement(By.xpath('(//*[@id="linkButton2"])[1]')).click()

      let expectedTitle = 'Options Page'
      let actualTitle = await driver.getTitle()

      assert.equal(actualTitle, expectedTitle)

      driver.close()
   })
})
