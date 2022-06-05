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

describe('Game board changes colour after clicking "Enter"', () => {    
        test('Test first box, first  row changes colour', async () => {
       
            await page.goto('https://multi-wordle.azurewebsites.net/game')
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            await page.locator('button:has-text("c")').click()
            
            await page.locator('button:has-text("Enter")').click()
     
            const box1 = await page.locator('(//*[@class="column-piece"])[1]')
            const color1 = await box1.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue('background-color')
         })
     
         expect(color1).toHaveText['rgb(0, 0, 255)','rgb(128, 128, 128)','rgb(255, 192, 203)']
        })

        test('Test fourth box, first row does not change colour', async () => {
       
            await page.goto('https://multi-wordle.azurewebsites.net/game')
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            
            await page.locator('button:has-text("Enter")').click()
     
            const box4 = await page.locator('(//*[@class="column-piece"])[4]')
            const color4 = await box4.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue('background-color')
         })
     
         expect(color4).toHaveText['rgb(200, 200, 200)']
        })

        test('Test second box, second  row changes colour', async () => {
            await page.goto('https://multi-wordle.azurewebsites.net/game')

            for(let i=0; i<2; i++){
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            await page.locator('button:has-text("c")').click()
            
            await page.locator('button:has-text("Enter")').click()
            }
     
            const box2 = await page.locator('(//*[@class="column-piece"])[7]')
            const color2 = await box2.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue('background-color')
         })
     
         expect(color2).toHaveText['rgb(0, 0, 255)','rgb(128, 128, 128)','rgb(255, 192, 203)']
        })

        test('Test third box, fourth  row changes colour', async () => {
            await page.goto('https://multi-wordle.azurewebsites.net/game')
            for(let i=0; i<4; i++){
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            await page.locator('button:has-text("c")').click()
            await page.locator('button:has-text("Enter")').click()
            }
     
            const box3 = await page.locator('(//*[@class="column-piece"])[18]')
            const color3 = await box3.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue('background-color')
         })
     
         expect(color3).toHaveText['rgb(0, 0, 255)','rgb(128, 128, 128)','rgb(255, 192, 203)']
        })
        
        test('Test third box, fifth row does not change colour', async () => {
            await page.goto('https://multi-wordle.azurewebsites.net/game')       
            for(let i=0; i<5; i++){
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            await page.locator('button:has-text("c")').click()
            await page.locator('button:has-text("Enter")').click()
            }
            await page.locator('button:has-text("m")').click()
            await page.locator('button:has-text("u")').click()
            await page.locator('button:has-text("s")').click()
            await page.locator('button:has-text("i")').click()
            await page.locator('button:has-text("Enter")').click()
     
            const box5 = await page.locator('(//*[@class="column-piece"])[18]')
            const color5 = await box5.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue('background-color')
         })
     
         expect(color5).toHaveText['rgb(156, 155, 155)']
        })
         
})

describe('Keyboard changes colour after clicking "Enter"', () => {    
    test('Test "m" key changes colour', async () => {
   
        await page.goto('https://multi-wordle.azurewebsites.net/game')
        await page.locator('button:has-text("m")').click()
        await page.locator('button:has-text("u")').click()
        await page.locator('button:has-text("s")').click()
        await page.locator('button:has-text("i")').click()
        await page.locator('button:has-text("c")').click()
        
        await page.locator('button:has-text("Enter")').click()
 
        const box1 = await page.locator('(//*[@class="column-piece"])[18]')//  'button:has-text("m")')
        const color1 = await box1.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('background-color')
     })
 
     expect(color1).toHaveText['rgb(0, 0, 255)','rgb(128, 128, 128)','rgb(255, 192, 203)']
    })

    test('Test "u" key changes colour', async () => {
   
        await page.goto('https://multi-wordle.azurewebsites.net/game')
        await page.locator('button:has-text("m")').click()
        await page.locator('button:has-text("u")').click()
        await page.locator('button:has-text("s")').click()
        await page.locator('button:has-text("i")').click()
        await page.locator('button:has-text("c")').click()
        
        await page.locator('button:has-text("Enter")').click()
 
        const box1 = await page.locator('button:has-text("u")')
        const color1 = await box1.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('background-color')
     })
 
     expect(color1).toHaveText['rgb(0, 0, 255)','rgb(128, 128, 128)','rgb(255, 192, 203)']
    })

    test('Test "i" key does not change colour', async () => {
   
        await page.goto('https://multi-wordle.azurewebsites.net/game')
        await page.locator('button:has-text("m")').click()
        await page.locator('button:has-text("u")').click()
        await page.locator('button:has-text("s")').click()
        await page.locator('button:has-text("i")').click()
        
        await page.locator('button:has-text("Enter")').click()
 
        const box1 = await page.locator('button:has-text("i")')
        const color1 = await box1.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue('background-color')
     })
 
     expect(color1).toHaveText['rgb(156, 155, 155)']
    })

})