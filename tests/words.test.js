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

describe('Word tests for valid and invalid inputs and alerts', () => {
   test('The enter button takes the user to the next row if their word is valid and it is not the last row', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("a")').click()
      await page.locator('button:has-text("p")').click()
      await page.locator('button:has-text("p")').click()
      await page.locator('button:has-text("l") >> nth=0').click()
      await page.locator('button:has-text("e") >> nth=0').click()
      await page.locator('button:has-text("Enter") >> nth=0').click()
      await page.locator('button:has-text("l") >> nth=0').click()
      await expect(page).toMatchText('.row-part >> nth=1', 'l') //checks the 2nd row
   })

   test('The user cannot go to the next row if their word is invalid and the pop up comes up', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("z")').click()
      await page.locator('button:has-text("a")').click()
      await page.locator('button:has-text("b")').click()
      await page.locator('button:has-text("a")').click()
      await page.locator('button:has-text("b")').click()
      await page.locator('button:has-text("Enter") >> nth=0').click()

      await page.on('dialog', async (dialog) => {
         expect(dialog.message()).toEqual(
            'Invalid: the word is not on the list'
         )
         await dialog.accept()
      })

      await page.locator('button:has-text("b")').click()
      await expect(page).toMatchText('.row-part >> nth=1', '') //checks the 2nd row is still nothing
   })

   test('The user cannot go to the next row if the word length NOT = 5 and the pop up comes up', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("z")').click()
      await page.locator('button:has-text("e") >> nth=0').click()
      await page.locator('button:has-text("b")').click()
      await page.locator('button:has-text("r") >> nth=0').click()
      await page.locator('button:has-text("Enter") >> nth=0').click()

      await page.on('dialog', async (dialog) => {
         expect(dialog.message()).toEqual(
            'Invalid: The word must be 5 letters long.'
         )
         await dialog.accept()
      })

      await page.locator('button:has-text("a")').click()
      await expect(page).toMatchText('.row-part >> nth=0', 'zebra') //checks that the user still on same row
   })
})
