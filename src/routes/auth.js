const passport = require('passport')

const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  login,
  logout,
  discordLogin,
  discordLoginCallback,
  googleLoginCallback
} = require('@controller/auth')

const router = express.Router()

router.post('/login', login)

router.get('/logout', isLoggedIn, logout)

router.get('/discord', discordLogin)

router.get(
  '/discord/callback',
  passport.authenticate('discord', {
    failureRedirect: '/'
  }),
  discordLoginCallback
)

router.post('/google/callback', googleLoginCallback)

module.exports = router
