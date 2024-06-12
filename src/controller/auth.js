const passport = require('passport')

const logger = require('@lib/logger')

const userService = require('@service/userService')
const OAuthLoginService = require('@service/OAuthLoginService')

const LoginRequestDTO = require('@authRequestDTO/loginRequestDTO')
const LoginResponseDTO = require('@authResponseDTO/loginResponseDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.login = async (req, res) => {
  try {
    const loginRequestDTO = new LoginRequestDTO(req.body)

    logger.info(`router/auth.js ${JSON.stringify({ reqParams: { ...loginRequestDTO } })}`)

    handleValidationError(loginRequestDTO)

    await userService.login(res, loginRequestDTO)

    const loginResponseDTO = new LoginResponseDTO({ isSuccess: true })

    logger.info(`router/auth.js.result: ${JSON.stringify(loginResponseDTO)}`)

    res.status(200).json(loginResponseDTO)
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.logout = async (req, res) => {
  try {
    await userService.logout(req, res)

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

      await OAuthLoginService.login(res, user)

      res.status(200).json({ isSuccess: true })
    } catch (err) {
      logger.error(`router/auth.js.error: ${err.message.toString()}`)

      res.status(500).json({ err: err.message.toString() })
    }
  })(req, res)
}
