const express = require('express')
const router = express.Router()
const passport = require('passport')
const dotenv = require('dotenv')
const util = require('util')
const url = require('url')
const querystring = require('querystring')

dotenv.config()

// Perform the login, after login Auth0 will redirect to callback
router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid read:all'
  }),
  function(req, res) {
    res.redirect('/')
  }
)

// Perform the final stage of authentication and redirect to previously requested URL or '/'
router.get('/callback', function(req, res, next) {
  passport.authenticate('auth0', function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err)
      }
      const returnTo = req.session.returnTo
      delete req.session.returnTo
      res.redirect(returnTo || '/')
    })
  })(req, res, next)
})

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout()

  const logoutURL = new URL(
    util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
  )
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: process.env.OFFICIAL_URL
  })
  logoutURL.search = searchString

  res.redirect(logoutURL)
})

module.exports = router
