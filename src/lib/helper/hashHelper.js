const crypto = require('crypto')

const envProvider = require('@provider/envProvider')

const iterations = envProvider.hash.iterations

const customizedPbkdf2 = (password, salt) =>
  new Promise((resolve) => {
    crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
      resolve(derivedKey)
    })
  })

const hashHelper = {
  encryptPassword: async (password, salt) => {
    const unParsedHash = await customizedPbkdf2(password, salt)
    const hash = unParsedHash.toString('hex')
    const encryptedPassword = `${salt}.${hash}`
    return encryptedPassword
  },
  parsePassword: (encryptedPassword) => {
    const encryptedPasswordSplit = encryptedPassword.split('.')
    if (!encryptedPasswordSplit || !encryptedPasswordSplit.length === 2) {
      throw new Error('encryptedPasswordSplit의 길이가 2가 아닙니다.')
    }
    return { salt: encryptedPasswordSplit[0], hash: encryptedPasswordSplit[1] }
  },
  comparePassword: async (hash, salt, password) => {
    const unParsedHash = await customizedPbkdf2(password, salt)
    const newHash = unParsedHash.toString('hex')
    return newHash === hash
  }
}

module.exports = hashHelper
