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
