const LoginResponseDTO = require('@authResponseDTO/loginResponseDTO')
const logger = require('@lib/logger')
const tokenManager = require('@lib/tokenManager')

const OAuthLoginService = {
  login: async (requestDTO) => {
    let loginResult = null
    let responseDTO = null

    try {
      loginResult = await tokenManager.makeTokens(requestDTO)

      responseDTO = new LoginResponseDTO(loginResult)
    } catch (err) {
      logger.error(`OAuthLoginService.login: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = OAuthLoginService
