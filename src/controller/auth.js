const passport = require('passport')

const logger = require('@lib/logger')

const userService = require('@service/userService')
const OAuthLoginService = require('@service/OAuthLoginService')

const LoginRequestDTO = require('@authRequestDTO/loginRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.login = async (req, res) => {
  try {
    const loginRequestDTO = new LoginRequestDTO(req.body)

    logger.info(`router/auth.js ${JSON.stringify({ reqParams: { ...loginRequestDTO } })}`)

    handleValidationError(loginRequestDTO)

    const responseDTO = await userService.login(loginRequestDTO)

    logger.info(`router/auth.js.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.logout = async (req, res) => {
  try {
    req.tokenUser = null
    req.newAccessToken && (req.newAccessToken = null)
    req.newRefreshToken && (req.newRefreshToken = null)

    res.status(200).json({ isSuccess: true })
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] })
exports.googleLoginCallback = (req, res) => {
  passport.authenticate('google', async (error, user) => {
    try {
      if (error) {
        throw new Error(error)
      }

      const responseDTO = await OAuthLoginService.login(user)

      res.status(200).json(responseDTO)
    } catch (err) {
      logger.error(`router/auth.js.error: ${err.message}`)

      res.status(500).json({ err: err.message })
    }
  })(req, res)
}
