const Arena = require('bull-arena')
const dotenv = require('dotenv')

dotenv.config()

module.exports = Arena(
  {
    queues: JSON.parse(process.env.ARENA_QUEUES_JSON)
  },
  { disableListen: true, basePath: '/arena' }
)
