const { chromium } = require('playwright')
const randomUseragent = require('random-useragent')
const useragent = randomUseragent.getRandom()

const config = require('./config')

async function run () {
  console.log('Bot run started')
  
  let browser

  try {
    browser = await chromium.launch({ headless: false, userAgent: useragent })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://gamertransfer.com/dashboard.html?m=17')

    await page.waitForTimeout(3000)
    
    await page.click('text=einloggen')
    await page.waitForTimeout(3000)

    await page.fill(':nth-match(input, 1)', config.username)

    await page.waitForTimeout(3000)
    await page.fill(':nth-match(input, 2)', config.password)

    await page.waitForTimeout(3000)

    try {
      await page.click('text=Anmelden')
    } catch (error) {
      await page.click('text=Log in')
      console.error("Couldn't click login button\n", error)
    }
    
    await page.waitForTimeout(1500)
    const loginFailed = await page.$('text=Fehler: E-Mail oder Passwort falsch')

    if (loginFailed) {
      console.error('Login failed\n', error)
      return
    }

    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'my_screenshot.png' })

    await page.click('.push')
    await page.waitForTimeout(1500)
    
    await page.click('.col-md-2.col-6')
    
    await browser.close()
  } catch (error) {
    await browser?.close()
    
    console.error('Bot run failed\n', error)
    return
  }
  
  console.log('Bot run successfully finished')
}

module.exports = {
  run
}
