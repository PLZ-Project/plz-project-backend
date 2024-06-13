const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
  deleteArticleForce,
  createArticleLike,
  deleteArticleLike
} = require('@controller/article')

const router = express.Router()

router.post('/', isLoggedIn, createArticle)

router.get('/:id', isLoggedIn, getArticle)

router.put('/:id', isLoggedIn, modifyArticle)

router.delete('/:id', isLoggedIn, deleteArticle)

router.delete('/force/:id', isLoggedIn, deleteArticleForce)

router.post('/like/:id', isLoggedIn, createArticleLike)

router.delete('/like/:id', deleteArticleLike)

module.exports = router
