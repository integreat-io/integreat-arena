const Arena = require('bull-arena')
const dotenv = require('dotenv')

dotenv.config()

const parseQueues = () => {
  try {
    return JSON.parse(process.env.ARENA_QUEUES_JSON)
  } catch (err) {
    return []
  }
}

const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASSWORD || undefined
const useTLS = process.env.REDIS_TLS === 'true'

const queues = parseQueues().map(queue => ({
  redis: {
    host,
    port,
    password,
    ...(useTLS ? { tls: { host, port } } : {})
  },
  ...queue
}))

module.exports = Arena(
  {
    queues
  },
  { disableListen: true, basePath: '/arena' }
)
