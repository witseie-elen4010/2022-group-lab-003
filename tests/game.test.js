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

describe('Game page tests for elements', () => {
   test('Game page opens', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')
      expect(await page.title()).toBe('MULTI-WORDLE')
   })

   test('One keyboard is displayed on Game page', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await expect(page).toHaveSelectorCount('#keyboard', 1)
   })
})
