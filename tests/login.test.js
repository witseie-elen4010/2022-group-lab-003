'use strict'
/* eslint-env jest */
/**
 * @jest-environment jsdom
 */

const { firefox } = require('playwright')
const loginValidator = require('../public/scripts/login.js')
let browser
let page

// Needs to be higher than the default Playwright timeout
jest.setTimeout(40 * 1000)

beforeAll(async () => {
   browser = await firefox.launch()
})
afterAll(async () => {
   await browser.close()
})
beforeEach(async () => {
   page = await browser.newPage()
})
afterEach(async () => {
   await page.close()
})

describe('Login page heading tests for Login, Options and Game pages', () => {
   test('Login page opened and title is correct', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/')
      expect(await page.title()).toBe('Multi-Wordle Login Page')
   })

   test('Options page opened and title is correct', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/options')
      expect(await page.title()).toBe('Options Page')
   })

   test('Game page opened and title is correct', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')
      expect(await page.title()).toBe('MULTI-WORDLE')
   })
})

describe('Login requirements', () => {
   test('Unsuccessful login - password has eight charaters, no numbers and is all lowercase', async () => {
       const testPassword = 'testingthelength'
       var result = loginValidator.passwordSecFunc(testPassword)
       expect(result).toBe(false)
   })

   test('Successful login - password has more than eight letters, at least one number, at least one upper case and at least one lower case', async () => {
       const testPassword = 'testingThe1'
       var result = loginValidator.passwordSecFunc(testPassword)
       expect(result).toBe(true)
  })

  test('Successful login - password has more than eight letters and more than one number', async () => {
       const testPassword = 'Testing123'
       var result = loginValidator.passwordSecFunc(testPassword)
       expect(result).toBe(true)
})

test('Unsuccessful login - username too short', async () => {
       const testUsername = 's'
       var result = loginValidator.correctLengthFunc(testUsername,3,30) //length must be between 3 and 30 characters long
       expect(result).toBe(false)
})

test('Unsuccessful login - username too long', async () => {
      const testUsername = 'thisisalongusernamethatiswaytoolongtoenter'
       var result = loginValidator.correctLengthFunc(testUsername,3,30) //length must be between 3 and 30 characters long
       expect(result).toBe(false)
})

test('Successful login - username is valid length and not empty', async () => {
       const testUsername = 'UsernameNew'
       var result = loginValidator.usernameFunc(testUsername) //length must be between 3 and 30 characters long
       expect(result).toBe(true)
})

test('Unsuccessful login - password only lowercase and uppercase letters, no numbers', async () => {
       const testPassword = 'testingthePASSWORD'
       var result = loginValidator.passwordSecFunc(testPassword)
       expect(result).toBe(false)
})

test('Unsuccessful login - password too short', async () => {
       const testPassword = 'test'
       var result = loginValidator.passwordSecFunc(testPassword)
       expect(result).toBe(false)
})

test('Unsuccessful login - password is empty', async () => {
   const testPassword = ''
   var result = loginValidator.passwordFunc(testPassword)
   expect(result).toBe(false)
})

})

