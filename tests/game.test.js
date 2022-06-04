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
   test('One game board is displayed on Game page', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')
      await expect(page).toHaveSelectorCount('#wordle-board', 1)
   })
   test('There are 6 rows in the game board on the game page', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')
      await expect(page).toHaveSelectorCount('.row-part', 6)
   })

   test('There are 30 squares and since there are 6 rows, there must be 5 columns', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')
      await expect(page).toHaveSelectorCount('.column-piece', 30)
   })
})
