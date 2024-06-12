const express = require('express')

const userRouter = require('./user')
const authRouter = require('./auth')
const emailRouter = require('./email')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/email', emailRouter)

module.exports = router
