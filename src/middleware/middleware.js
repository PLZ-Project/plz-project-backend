const tokenManager = require('@lib/tokenManager')
const middlewareHelper = require('@helper/middlewareHelper')

const getAccessToken = (req) => req.headers?.accesstoken
const getRefreshToken = (req) => req.headers?.refreshtoken

const middleware = {
  async isLoggedIn(req, res, next) {
    const accessToken = getAccessToken(req)
    const refreshToken = getRefreshToken(req)

    if (!accessToken) {
      return middlewareHelper.createError(res, 'Not Login User', 401)
    }

    try {
      await tokenManager.handleTokens(req, accessToken, refreshToken)
    } catch (err) {
      return tokenManager.handleTokenError(req, res, err, refreshToken, next)
    }

    next()
  }
}

module.exports = middleware
