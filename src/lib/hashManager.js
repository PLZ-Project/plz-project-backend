const crypto = require('crypto')

const hashHelper = require('./helper/hashHelper')

const hashManager = {
  makePasswordHash: (password) => {
    const salt = crypto.randomBytes(64).toString('base64')

    if (!password) throw new Error('입력한 패스워드가 없습니다.')

    return hashHelper.encryptPassword(password, salt)
  },
  checkPasswordHash: (password, encryptedPassword) => {
    const parsedData = hashHelper.parsePassword(encryptedPassword)

    try {
      if (!password || !encryptedPassword) {
        throw new Error('패스워드나 암호화된 hash값이 없습니다.')
      }

      return hashHelper.comparePassword(parsedData.hash, parsedData.salt, password)
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = hashManager
