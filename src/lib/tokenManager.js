const jwt = require('jsonwebtoken')

const envProvider = require('./provider/envProvider')
const cookieProvier = require('./provider/cookieProvider')

const jwtHelper = require('./helper/jwtHelper')
const redisHelper = require('./helper/redisHelper')
const middlewareHelper = require('./helper/middlewareHelper')

const tokenManager = {
  makeTokens: async (res, user) => {
    const payload = jwtHelper.makePayload(user)
    const tokens = jwtHelper.getTokens(payload)

    await redisHelper.delRedisData(payload.id)
    await redisHelper.setRedisData(payload.id, tokens.refreshToken)

    await cookieProvier.setTokensToCookie(res, tokens, payload)
  },
  makeAccessToken: async (user) => {
    const payload = jwtHelper.makePayload(user)
    const accessToken = jwtHelper.getToken(payload, 'access')

    return accessToken
  },
  makeNewRefreshToken: async (user) => {
    const payload = jwtHelper.makePayload(user)
    const newRefreshToken = jwtHelper.getToken(payload, 'refresh')

    await redisHelper.delRedisData(payload.id)
    await redisHelper.setRedisData(payload.id, newRefreshToken)

    return newRefreshToken
  },
  checkRefreshToken: async (id, refreshToken) => {
    try {
      const decodedRefreshToken = jwt.verify(refreshToken, envProvider.jwt.secretKey.refreshKey)
      const storedRefreshToken = await redisHelper.getRedisData(decodedRefreshToken.id)

      if (!storedRefreshToken || refreshToken !== storedRefreshToken) {
        await redisHelper.delRedisData(id)
        throw new Error()
      }

      return true
    } catch {
      return false
    }
  },
  generateAndStoreRefreshToken: async (res, decodedToken) => {
    const payload = jwtHelper.makePayload(decodedToken)
    const newRefreshToken = await tokenManager.makeNewRefreshToken(payload)

    await redisHelper.delRedisData(payload.id)
    await redisHelper.setRedisData(decodedToken.id, newRefreshToken)

    cookieProvier.setRefreshTokenToCookie(res, newRefreshToken)
  },
  validateAndGenerateAccessToken: async (req, res, refreshToken) => {
    const decodedRefreshToken = jwt.verify(refreshToken, envProvider.jwt.secretKey.refreshKey)
    const payload = jwtHelper.makePayload(decodedRefreshToken)
    const newAccessToken = await tokenManager.makeAccessToken(payload)

    if (await tokenManager.checkRefreshToken(payload.id, refreshToken)) {
      cookieProvier.setAccessTokenToCookie(res, newAccessToken)
    } else {
      throw new Error()
    }

    req.tokenUser = decodedRefreshToken
  },
  handleTokenError: async (req, res, err, refreshToken) => {
    if (refreshToken && err.name === 'TokenExpiredError') {
      try {
        await tokenManager.validateAndGenerateAccessToken(req, res, refreshToken)
      } catch {
        res.clearCookie('userInfo')
        return middlewareHelper.createError(res, 'Invalid AccessToken And RefreshToken', 403)
      }
    } else {
      res.clearCookie('userInfo')
      return middlewareHelper.createError(res, 'Not Login User', 401)
    }
  },
  handleTokens: async (req, res, accessToken, refreshToken) => {
    try {
      const decodedToken = jwt.verify(accessToken, envProvider.jwt.secretKey.accessKey)
      if (!refreshToken || !(await tokenManager.checkRefreshToken(decodedToken.id, refreshToken))) {
        await tokenManager.generateAndStoreRefreshToken(res, decodedToken)
      }
      req.tokenUser = decodedToken
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  },
  destroyTokens: async (req, res) => {
    const payload = jwtHelper.makePayload(req.tokenUser)

    await redisHelper.delRedisData(payload.id)

    cookieProvier.destroyTokenCookie(res)

    req.tokenUser = null
  }
}

module.exports = tokenManager
