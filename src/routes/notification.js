const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createCommentNotify,
  resendCommentNotify,
  getNotify,
  getTaggedNotify
} = require('@controller/notification')

const router = express.Router()

router.post('/comment', isLoggedIn, createCommentNotify)

router.post('/resendComment', isLoggedIn, resendCommentNotify)

router.get('/:userId', getNotify)

router.get('/taggedUser/:userId/:commentId', getTaggedNotify)

router.post('/chat', async (req, res) => {
  // try {
  //   logger.info(`router/notification.js ${JSON.stringify({ reqParams: { ...loginRequestDTO } })}`)
  //   logger.info(`router/notification.js.result: ${JSON.stringify(loginResponseDTO)}`)
  //   res.status(200).json(loginResponseDTO)
  // } catch (err) {
  //   logger.error(`router/notification.js.error: ${err.message.toString()}`)
  //   res.status(500).json({ err: err.message.toString() })
  // }
})

module.exports = router
