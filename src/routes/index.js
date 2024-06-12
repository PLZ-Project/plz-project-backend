const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ isSuccess: true })
})

module.exports = router
