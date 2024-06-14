const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createUser,
  getUserInfo,
  getUserByNickname,
  checkEmail,
  modifyUserPw,
  modifyUserNickname,
  modifyUserIsConfirm,
  deleteUser,
  deleteUserForce
} = require('@controller/user')

const router = express.Router()

router.post('/', createUser)

router.get('/:id', getUserInfo)

router.get('/nickname/:nickname', getUserByNickname)

router.post('/checkEmail', checkEmail)

router.put('/updatePw', isLoggedIn, modifyUserPw)

router.put('/updateNickname', isLoggedIn, modifyUserNickname)

router.put('/updateIsConfirm/:id', modifyUserIsConfirm)

router.delete('/', isLoggedIn, deleteUser)

router.delete('/force', isLoggedIn, deleteUserForce)

module.exports = router
