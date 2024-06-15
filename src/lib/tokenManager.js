const jwt = require('jsonwebtoken')

const envProvider = require('./provider/envProvider')

const jwtHelper = require('./helper/jwtHelper')
const redisHelper = require('./helper/redisHelper')
const middlewareHelper = require('./helper/middlewareHelper')

const ResponseTokenDTO = require('@authResponseDTO/responseTokenDTO')

const tokenManager = {
  makeTokens: async (user) => {
    const payload = jwtHelper.makePayload(user)
    const { accessToken, refreshToken } = jwtHelper.getTokens(payload)

    await redisHelper.delRedisData(payload.id)
    await redisHelper.setRedisData(payload.id, refreshToken)

    return { accessToken, refreshToken, userInfo: payload }
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
  generateAndStoreRefreshToken: async (decodedToken) => {
    const payload = jwtHelper.makePayload(decodedToken)
    const newRefreshToken = await tokenManager.makeNewRefreshToken(payload)

    await redisHelper.delRedisData(payload.id)
    await redisHelper.setRedisData(decodedToken.id, newRefreshToken)

    return newRefreshToken
  },
  validateAndGenerateAccessToken: async (req, refreshToken) => {
    const decodedRefreshToken = jwt.verify(refreshToken, envProvider.jwt.secretKey.refreshKey)
    const payload = jwtHelper.makePayload(decodedRefreshToken)
    const newAccessToken = await tokenManager.makeAccessToken(payload)

    if (await tokenManager.checkRefreshToken(payload.id, refreshToken)) {
      req.tokenUser = decodedRefreshToken

      return newAccessToken
    }
    throw new Error()
  },
  handleTokenError: async (req, res, err, refreshToken, next) => {
    try {
      if (refreshToken || err.name === 'TokenExpiredError') {
        const newAccessToken = await tokenManager.validateAndGenerateAccessToken(req, refreshToken)

        newAccessToken &&
          (req.responseTokenDTO = new ResponseTokenDTO({ accessToken: newAccessToken }))
      } else {
        throw new Error(0)
      }
    } catch (error) {
      req.tokenUser = null

      return error.message === 0
        ? middlewareHelper.createError(res, 'Not Login User', 401)
        : middlewareHelper.createError(res, 'Invalid AccessToken And RefreshToken', 403)
    }

    next()
  },
  handleTokens: async (req, accessToken, refreshToken) => {
    let newRefreshToken = null

    try {
      const decodedToken = jwt.verify(accessToken, envProvider.jwt.secretKey.accessKey)
      if (!refreshToken || !(await tokenManager.checkRefreshToken(decodedToken.id, refreshToken))) {
        newRefreshToken = await tokenManager.generateAndStoreRefreshToken(decodedToken)
      }

      req.tokenUser = decodedToken
      newRefreshToken &&
        (req.responseTokenDTO = new ResponseTokenDTO({ refreshToken: newRefreshToken }))
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  }
}

module.exports = tokenManager
