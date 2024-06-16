const express = require('express')

const userRouter = require('./user')
const authRouter = require('./auth')
const emailRouter = require('./email')
const boardRouter = require('./board')
const articleRouter = require('./article')
const commentRouter = require('./comment')
const communityRouter = require('./community')
const notificationRouter = require('./notification')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/email', emailRouter)
router.use('/board', boardRouter)
router.use('/article', articleRouter)
router.use('/comment', commentRouter)
router.use('/community', communityRouter)
router.use('/notification', notificationRouter)

module.exports = router
