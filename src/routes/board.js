const express = require('express')

const { isLoggedIn } = require('@middleware/middleware')

const {
  createBoard,
  getList,
  getBoard,
  modifyBoard,
  deleteBoard,
  deleteBoardForce
} = require('@controller/board')

const router = express.Router()

router.post('/', isLoggedIn, createBoard)

router.get('/list', getList)

router.get('/:id', getBoard)

router.put('/:id', isLoggedIn, modifyBoard)

router.delete('/:id', isLoggedIn, deleteBoard)

router.delete('/force/:id', isLoggedIn, deleteBoardForce)

module.exports = router
