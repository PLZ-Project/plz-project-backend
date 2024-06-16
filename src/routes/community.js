const express = require('express')

const { upload } = require('@helper/mvcHelper')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createCommunity,
  getList,
  getCommunity,
  modifyCommunity,
  deleteCommunity,
  deleteCommunityForce
} = require('@controller/community')

const router = express.Router()

router.post(
  '/',
  isLoggedIn,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),
  createCommunity
)

router.get('/list', getList)

router.get('/:id', isLoggedIn, getCommunity)

router.put(
  '/:id',
  isLoggedIn,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),
  modifyCommunity
)

router.delete('/:id', isLoggedIn, deleteCommunity)

router.delete('/force/:id', isLoggedIn, deleteCommunityForce)

module.exports = router
