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

describe('Instruction page clicking tests', () => {
   test('Instruction page opens therefore title is MULTI-WORDLE', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/instructions')
      expect(await page.title()).toBe('MULTI-WORDLE')
   })

   test('Instruction page opened after clicking instructions button on Game page', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.click('(//*[@id="linkButton"])[2]')
      expect(await page.title()).toBe('MULTI-WORDLE')
   })
})
