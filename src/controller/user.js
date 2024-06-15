const superagent = require('superagent')

const logger = require('@lib/logger')
const envProvider = require('@provider/envProvider')

const userService = require('@service/userService')

const UserCreateRequestDTO = require('@userRequestDTO/userCreateRequestDTO')
const UserReadRequestDTO = require('@userRequestDTO/userReadRequestDTO')
const UserUpdateRequestDTO = require('@userRequestDTO/userUpdateRequestDTO')
const UserDeleteRequestDTO = require('@userRequestDTO/userDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createUser = async (req, res) => {
  try {
    const requestDTO = new UserCreateRequestDTO(req.body)

    logger.info(`router/user.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const confirmExitstedDTO = await superagent
      .post(`${envProvider.common.endPoint}:${envProvider.common.port}/api/user/checkEmail`)
      .send(requestDTO)

    if (confirmExitstedDTO.body.isHasEmail) {
      throw new Error('이미 존재하는 이메일입니다.')
    }

    const responseDTO = await userService.reg(requestDTO)

    await superagent
      .post(`${envProvider.common.endPoint}:${envProvider.common.port}/api/email/sendEmail`)
      .send(responseDTO)

    logger.info(`router/user.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.reg.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    const requestDTO = new UserReadRequestDTO(req.params)

    logger.info(`router/user.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.info(requestDTO)

    logger.info(`router/user.js.info.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getUserByNickname = async (req, res) => {
  try {
    const requestDTO = new UserReadRequestDTO(req.params)

    logger.info(`router/user.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.infoByNickname(requestDTO)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.checkEmail = async (req, res) => {
  try {
    const requestDTO = new UserReadRequestDTO({ ...req.body })

    logger.info(`router/user.js.checkEmail.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = (await userService.getEmailUser(requestDTO)).id
      ? { isHasEmail: true }
      : { isHasEmail: false }

    logger.info(`router/user.js.checkEmail.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.modifyUserPw = async (req, res) => {
  try {
    const requestDTO = new UserUpdateRequestDTO({ ...req.body, id: req.tokenUser.id })

    logger.info(`router/user.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.editPassword(req, requestDTO)

    logger.info(`router/user.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.modifyUserNickname = async (req, res) => {
  try {
    const requestDTO = new UserUpdateRequestDTO({ ...req.body, id: req.tokenUser.id })

    logger.info(`router/user.js.update.params: ${JSON.stringify(requestDTO)}`)

    const result = await userService.editNickname(req, requestDTO)
    logger.info(`router/user.js.update.result: ${JSON.stringify(result)}`)

    res.status(200).json(result)
  } catch (err) {
    logger.error(`router/user.js.update.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.modifyUserIsConfirm = async (req, res) => {
  try {
    const requestDTO = new UserUpdateRequestDTO({ ...req.params, isConfirm: true })

    logger.info(`router/user.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.editIsConfirm(req, requestDTO)

    logger.info(`router/user.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/user.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const requestDTO = new UserDeleteRequestDTO({ id: req.tokenUser.id })

    logger.info(`router/user.js.delete.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.delete(req, requestDTO)

    logger.info(`router/user.js.delete.result: ${JSON.stringify(responseDTO)}`)

    await superagent
      .get(`${envProvider.common.host}:${envProvider.common.port}/api/auth/logout`)
      .set('access_token', req.headers.access_token)
      .set('refresh_token', req.headers.refresh_token)
      .set('Accept', 'application/json')

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.deleteUserForce = async (req, res) => {
  try {
    const requestDTO = new UserDeleteRequestDTO({ id: req.tokenUser.id })

    logger.info(`router/user.js.delete.params) ${JSON.stringify(requestDTO)}`)

    const responseDTO = await userService.deleteForce(req, requestDTO)

    logger.info(`router/user.js.delete.result) ${JSON.stringify(responseDTO)}`)

    await superagent
      .get(`${envProvider.common.host}:${envProvider.common.port}/api/auth/logout`)
      .set('access_token', req.headers.access_token)
      .set('refresh_token', req.headers.refresh_token)
      .set('Accept', 'application/json')

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
