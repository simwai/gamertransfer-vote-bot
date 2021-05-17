const { chromium } = require('playwright')
const randomUseragent = require('random-useragent')
const useragent = randomUseragent.getRandom()
const config = require('../config')

async function run () {
  console.log('started')

  try {
    const browser = await chromium.launch({ headless: true, userAgent: useragent })
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
    await page.click('text=Log in')

    await page.waitForTimeout(1500)
    const loginFailed = await page.$('text=Fehler: E-Mail oder Passwort falsch')

    if (loginFailed) {
      console.log('login failed')
      return
    }

    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'my_screenshot.png' })

    await page.click('.push')
    await page.waitForTimeout(1500)

    await page.click('.col-md-2.col-6')
  } catch (error) {
    console.log('failed')
    console.log(error)
    return
  }

  console.log('success')
}

(async () => await run())()

module.exports = {
  run
}
