const express = require('express')

const { sendEmail, verify } = require('@controller/email')

const router = express.Router()

router.post('/sendEmail', sendEmail)

router.get('/emailVerify/:id/:verificationCode', verify)

module.exports = router
