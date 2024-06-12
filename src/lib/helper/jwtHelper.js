const jwt = require('jsonwebtoken')

const envProvider = require('@provider/envProvider')

const jwtHelper = {
  makePayload: (user) => ({
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    role: user.role
  }),
  getTokens: (payload) => {
    const accessToken = jwtHelper.getToken(payload, 'access')
    console.log('🚀 ~ accessToken:', accessToken)
    const refreshToken = jwtHelper.getToken(payload, 'refresh')
    console.log('🚀 ~ refreshToken:', refreshToken)

    return { accessToken, refreshToken }
  },
  getToken: (payload, flag) =>
    jwt.sign(
      payload,
      flag === 'access'
        ? envProvider.jwt.secretKey.accessKey
        : envProvider.jwt.secretKey.refreshKey,
      flag === 'access'
        ? envProvider.jwt.options.accessTokenOptions
        : envProvider.jwt.options.refreshTokenOptions
    )
}

module.exports = jwtHelper
