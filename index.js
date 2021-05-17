const { chromium } = require('playwright')
const schedule = require('node-schedule')
const randomUseragent = require('random-useragent')

const config = require('./config')
const useragent = randomUseragent.getRandom()

// run the bot every 4 hours
schedule.scheduleJob('0 0 0/4 1/1 * ? *', async () => {
  console.log('Job runs')
  await run()
})

async function run () {
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

  await page.waitForTimeout(3000)
  const pushButtons = await page.$$('.push')

  for (const el of pushButtons) {
    await el.click()
    await page.waitForTimeout(1500)
  }
}
