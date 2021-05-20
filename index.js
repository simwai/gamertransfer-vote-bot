const Queue = require('bull')
const bot = require('./bot')

const voteQueue = new Queue('start vote bot')

voteQueue.on('error', (error) => {
  console.log('vote queue error: ', error)
})

voteQueue.on('completed', () => {
  console.log('vote queue completed')
})

voteQueue.process(async function () {
  console.log('job triggered')
  return bot.run()
})

// run job every four hours (every 240 minutes)
// voteQueue.add({}, { repeat: { cron: '*/240 * * * *' } })
voteQueue.add({})
