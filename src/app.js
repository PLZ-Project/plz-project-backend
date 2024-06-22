require('module-alias/register')

const path = require('path')
const passport = require('passport')

const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const DiscordStrategy = require('passport-discord').Strategy

const logger = require('@lib/logger')

const models = require('@models/index')

const indexRouter = require('@routes/index')
const envProvider = require('@lib/provider/envProvider')

const app = express()

logger.info('app start')

models.sequelize
  .authenticate()
  .then(() => {
    logger.info('DB connection success')

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info('Sequelize sync success')
      })
      .catch((err) => {
        logger.error('Sequelize sync error', err)
      })
  })
  .catch((err) => {
    logger.error('DB Connection fail', err)
  })

app.use(
  session({
    secret: envProvider.session.secretKey,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(
  new DiscordStrategy(
    {
      clientID: envProvider.discord.clientId,
      clientSecret: envProvider.discord.clientSecret,
      callbackURL: envProvider.discord.callbackUrl,
      scope: ['identify', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile))
    }
  )
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', indexRouter)

module.exports = app
