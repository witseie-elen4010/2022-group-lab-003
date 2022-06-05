'use strict'

const { firefox } = require('playwright')
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
   test('Successful login - password has eight charaters', async () => {
       await page.goto('https://multi-wordle.azurewebsites.net')
       await page.locator('id=username').fill('admin')
       await page.locator('id=password').fill('1Abcdefg')
       await page.click('#linkButton2')
       await page.click('#linkButton2')
       expect(await page.title()).toBe('Options Page')
   })

   test('Successful login - password has more than eight letters and one number', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net')
      await page.locator('id=username').fill('admin')
      await page.locator('id=password').fill('abcDEF1GHIjkl')
      await page.click('#linkButton2')
      await page.click('#linkButton2')
      expect(await page.title()).toBe('Options Page')
  })

  test('Successful login - password has more than eight letters and more than one number', async () => {
   await page.goto('https://multi-wordle.azurewebsites.net')
   await page.locator('id=username').fill('admin')
   await page.locator('id=password').fill('12abcDEF1GHIjkl34')
   await page.click('#linkButton2')
   await page.click('#linkButton2')
   expect(await page.title()).toBe('Options Page')
})

test('Unsuccessful login - username too short', async () => {
   await page.goto('https://multi-wordle.azurewebsites.net')
   await page.locator('id=username').fill('a')
   await page.locator('id=password').fill('1Abcdefg')
   await page.click('#linkButton2')
   await page.click('#linkButton2')
   expect(await page.title()).toBe('Multi-Wordle Login Page')
})

test('Unsuccessful login - password only three characters long', async () => {
   await page.goto('https://multi-wordle.azurewebsites.net')
   await page.locator('id=username').fill('admin')
   await page.locator('id=password').fill('ab1')
   await page.click('#linkButton2')
   await page.click('#linkButton2')
   expect(await page.title()).toBe('Multi-Wordle Login Page')
})

test('Unsuccessful login - password only lowercase and uppercase letters, no numbers', async () => {
   await page.goto('https://multi-wordle.azurewebsites.net')
   await page.locator('id=username').fill('admin')
   await page.locator('id=password').fill('abcDEFGH')
   await page.click('#linkButton2')
   await page.click('#linkButton2')
   expect(await page.title()).toBe('Multi-Wordle Login Page')
})

})

