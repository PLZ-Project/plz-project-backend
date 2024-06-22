const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createCommentNotify,
  resendCommentNotify,
  createLikeNotify,
  getNotify,
  getTaggedNotify
} = require('@controller/notification')

const router = express.Router()

router.post('/comment', isLoggedIn, createCommentNotify)

router.post('/resendComment', isLoggedIn, resendCommentNotify)

router.post('/like', isLoggedIn, createLikeNotify)

router.get('/:userId', getNotify)

router.get('/taggedUser/:userId/:commentId', getTaggedNotify)

module.exports = router
