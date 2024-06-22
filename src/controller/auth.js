const passport = require('passport')
const superagent = require('superagent')

const logger = require('@lib/logger')
const envProvider = require('@lib/provider/envProvider')

const userService = require('@service/userService')
const OAuthLoginService = require('@service/OAuthLoginService')

const userDao = require('@dao/userDao')

const { handleValidationError } = require('@helper/mvcHelper')

const LoginRequestDTO = require('@authRequestDTO/loginRequestDTO')

const UserReadRequestDTO = require('@userRequestDTO/userReadRequestDTO')
const UserCreateRequestDTO = require('@userRequestDTO/userCreateRequestDTO')

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

    logger.info(`router/auth.js.logout: ${{ isSuccess: true }}`)

    res.status(200).json({ isSuccess: true })
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.discordLogin = (req, res, next) => {
  passport.authenticate('discord', {
    failureRedirect: '/'
  })(req, res, next)
}
exports.discordLoginCallback = async (req, res) => {
  let userResponseDTO = null

  try {
    const { email, id } = req.user

    const requestDTO = new UserReadRequestDTO({ email })

    userResponseDTO = await userDao.selectUser(requestDTO)

    if (!userResponseDTO.id) {
      const userCreateRequestDTO = new UserCreateRequestDTO({
        email,
        nickname: `shibaDog${new Date().getTime()}`,
        password: id,
        isConfirm: true
      })

      userResponseDTO = await userDao.insert(userCreateRequestDTO)
    }

    const responseDTO = await OAuthLoginService.login(userResponseDTO)

    logger.info(`router/auth.js.result: ${JSON.stringify(responseDTO)}`)

    res.redirect(
      `http://localhost:5173/login?from=discord&responseDTO=${JSON.stringify(responseDTO)}`
    )
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.googleLoginCallback = async (req, res) => {
  let userResponseDTO = null

  try {
    const { tokenId } = req.body

    const authData = await superagent
      .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`)
      .set('Accept', 'application/json')
      .then((response) => response._body)

    const { email, sub } = authData

    const requestDTO = new UserReadRequestDTO({ email })

    userResponseDTO = await userDao.selectUser(requestDTO)

    if (!userResponseDTO.id) {
      const userCreateRequestDTO = new UserCreateRequestDTO({
        email,
        nickname: `shibaDog${new Date().getTime()}`,
        password: sub,
        isConfirm: true
      })

      userResponseDTO = await userDao.insert(userCreateRequestDTO)
    }

    const responseDTO = await OAuthLoginService.login(userResponseDTO)

    logger.info(`router/auth.js.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
