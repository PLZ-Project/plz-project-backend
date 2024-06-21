const express = require('express')

const { sendEmail, verify, getEmailVerify } = require('@controller/email')

const router = express.Router()

router.post('/sendEmail', sendEmail)

router.get('/:id', getEmailVerify)

router.get('/emailVerify/:id/:verificationCode', verify)

module.exports = router
