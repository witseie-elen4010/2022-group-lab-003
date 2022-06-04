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

describe('Keyboard tests for the delete and enter buttons', () => {
   test('The letter is deleted after clicking the delete button', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("z")').click()
      await page.locator('button:has-text("a")').click()
      await page.locator('button:has-text("b")').click()
      await page.locator('button:has-text("Del")').click()
      await expect(page).toMatchText('.row-part', 'za')
   })
})

describe('Keyboard tests for each letter', () => {
   test('The correct letter is displayed on the game board after clicking the letter "z" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("z")').click()
      await expect(page).toMatchText('.column-piece', 'z')
   })
   test('The correct letter is displayed on the game board after clicking the letter "q" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("q")').click()
      await expect(page).toMatchText('.column-piece', 'q')
   })
   test('The correct letter is displayed on the game board after clicking the letter "w" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("w")').click()
      await expect(page).toMatchText('.column-piece', 'w')
   })
   test('The correct letter is displayed on the game board after clicking the letter "e" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("e") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 'e')
   })
   test('The correct letter is displayed on the game board after clicking the letter "r" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("r") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 'r')
   })
   test('The correct letter is displayed on the game board after clicking the letter "t" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("t") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 't')
   })
   test('The correct letter is displayed on the game board after clicking the letter "y" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("y")').click()
      await expect(page).toMatchText('.column-piece', 'y')
   })
   test('The correct letter is displayed on the game board after clicking the letter "u" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("u")').click()
      await expect(page).toMatchText('.column-piece', 'u')
   })
   test('The correct letter is displayed on the game board after clicking the letter "i" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("i")').click()
      await expect(page).toMatchText('.column-piece', 'i')
   })
   test('The correct letter is displayed on the game board after clicking the letter "o" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("o")').click()
      await expect(page).toMatchText('.column-piece', 'o')
   })
   test('The correct letter is displayed on the game board after clicking the letter "p" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("p")').click()
      await expect(page).toMatchText('.column-piece', 'p')
   })
   test('The correct letter is displayed on the game board after clicking the letter "a" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("a")').click()
      await expect(page).toMatchText('.column-piece', 'a')
   })
   test('The correct letter is displayed on the game board after clicking the letter "s" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("s")').click()
      await expect(page).toMatchText('.column-piece', 's')
   })
   test('The correct letter is displayed on the game board after clicking the letter "d" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("d") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 'd')
   })
   test('The correct letter is displayed on the game board after clicking the letter "f" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("f")').click()
      await expect(page).toMatchText('.column-piece', 'f')
   })
   test('The correct letter is displayed on the game board after clicking the letter "g" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("g")').click()
      await expect(page).toMatchText('.column-piece', 'g')
   })
   test('The correct letter is displayed on the game board after clicking the letter "h" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("h")').click()
      await expect(page).toMatchText('.column-piece', 'h')
   })
   test('The correct letter is displayed on the game board after clicking the letter "j" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("j")').click()
      await expect(page).toMatchText('.column-piece', 'j')
   })
   test('The correct letter is displayed on the game board after clicking the letter "k" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("k")').click()
      await expect(page).toMatchText('.column-piece', 'k')
   })
   test('The correct letter is displayed on the game board after clicking the letter "l" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("l") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 'l')
   })
   test('The correct letter is displayed on the game board after clicking the letter "x" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("x")').click()
      await expect(page).toMatchText('.column-piece', 'x')
   })
   test('The correct letter is displayed on the game board after clicking the letter "c" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("c")').click()
      await expect(page).toMatchText('.column-piece', 'c')
   })
   test('The correct letter is displayed on the game board after clicking the letter "v" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("v")').click()
      await expect(page).toMatchText('.column-piece', 'v')
   })
   test('The correct letter is displayed on the game board after clicking the letter "b" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("b")').click()
      await expect(page).toMatchText('.column-piece', 'b')
   })
   test('The correct letter is displayed on the game board after clicking the letter "n" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("n") >> nth=0').click()
      await expect(page).toMatchText('.column-piece', 'n')
   })
   test('The correct letter is displayed on the game board after clicking the letter "m" on keyboard', async () => {
      await page.goto('https://multi-wordle.azurewebsites.net/game')

      await page.locator('button:has-text("m")').click()
      await expect(page).toMatchText('.column-piece', 'm')
   })
})
