const express = require('express')

const userRouter = require('./user')
const authRouter = require('./auth')
const emailRouter = require('./email')
const communityRouter = require('./community')
const boardRouter = require('./board')
const articleRouter = require('./article')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/email', emailRouter)
router.use('/community', communityRouter)
router.use('/board', boardRouter)
router.use('/board', boardRouter)
router.use('/article', articleRouter)

module.exports = router
