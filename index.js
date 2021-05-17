const Cabin = require('cabin')
const Bree = require('bree')
const Graceful = require('@ladjs/graceful')

const bree = new Bree({
  logger: new Cabin(),
  jobs: [
    {
      name: 'bot',
      interval: '4h'
    }
  ]
})

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] })
graceful.listen()

// start all jobs (this is the equivalent of reloading a crontab):
bree.start()
