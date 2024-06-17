const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createComment,
  getCommentList,
  modifyComment,
  deleteComment,
  deleteCommentForce
} = require('@controller/comment')

const router = express.Router()

router.post('/', isLoggedIn, createComment)

router.get('/list', getCommentList)

router.put('/:id', isLoggedIn, modifyComment)

router.delete('/:id', isLoggedIn, deleteComment)

router.delete('/force/:id', isLoggedIn, deleteCommentForce)

module.exports = router
