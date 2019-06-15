const express = require('express')
const router = express.Router()

// Redirect to Arena
router.get('/', (req, res) => {
  res.redirect('/arena')
})

module.exports = router
