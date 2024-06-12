const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const { login, logout, googleLoginCallback, googleLogin } = require('@controller/auth')

const router = express.Router()

router.post('/login', login)

router.get('/logout', isLoggedIn, logout)

router.get('/google', googleLogin)

router.get('/google/callback', googleLoginCallback)

module.exports = router
