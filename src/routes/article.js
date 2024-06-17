const express = require('express')

const { upload } = require('@lib/helper/mvcHelper')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createArticle,
  searchArticle,
  getArticle,
  modifyArticleHit,
  modifyArticle,
  deleteArticle,
  deleteArticleForce,
  createArticleLike,
  deleteArticleLike
} = require('@controller/article')

const { articleImageUpload } = require('@controller/image')

const router = express.Router()

router.post('/', isLoggedIn, createArticle)

router.get('/search', searchArticle)

router.get('/:id', getArticle)

router.put('/modifyHit/:id', modifyArticleHit)

router.put('/:id', isLoggedIn, modifyArticle)

router.delete('/:id', isLoggedIn, deleteArticle)

router.delete('/force/:id', isLoggedIn, deleteArticleForce)

router.post('/like/:id', isLoggedIn, createArticleLike)

router.delete('/like/:id', isLoggedIn, deleteArticleLike)

router.post('/imageUpload', upload.array('images', 5), articleImageUpload)

module.exports = router
