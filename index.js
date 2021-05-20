const bot = require('./bot');

(async () => {
  await bot.run()
})()

setInterval(async () => {
  await bot.run()
  // 4 hours * 60 mins * 60 s * 1000 ms
}, 4 * 60 * 60 * 1000)
