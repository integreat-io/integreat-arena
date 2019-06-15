const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')
const indexRouter = require('./lib/routes')
const authRouter = require('./lib/routes/auth')
const arenaRouter = require('./lib/routes/arena')
const securedMiddleware = require('./lib/middleware/secured')

dotenv.config()

const app = express()
const port = process.env.PORT || '4567'

// Config express-session
var sess = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  sess.cookie.secure = true // serve secure cookies, requires https
}

app.use(session(sess))

// Config passport -- must happen after express-session

app.use(passport.initialize())
app.use(passport.session())

// Config routes
app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/', securedMiddleware(), arenaRouter)

// Start server
app.listen(port, () => console.log(`Arena listening at port ${port}`))
