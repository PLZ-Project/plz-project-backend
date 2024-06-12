const logger = require('@lib/logger')
const tokenManager = require('@lib/tokenManager')

const OAuthLoginService = {
  login: async (res, requestDTO) => {
    try {
      await tokenManager.makeTokens(res, requestDTO)
    } catch (err) {
      logger.error(`OAuthLoginService.login: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  }
}

module.exports = OAuthLoginService
