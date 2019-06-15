const express = require('express')
const router = express.Router()

// Redirect to Arena
router.get('/', (req, res) => {
  res.redirect('/arena')
})

// Health
router.get('/healthz', (req, res) => {
  res.send('ok')
})

module.exports = router
