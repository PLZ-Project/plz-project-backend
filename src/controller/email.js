const superagent = require('superagent')

const logger = require('@lib/logger')
const envProvider = require('@provider/envProvider')

const emailService = require('@service/emailService')

const SendRequestDTO = require('@emailRequestDTO/sendRequestDTO')
const VerifyRequestDTO = require('@emailRequestDTO/verifyRequestDTO')

exports.sendEmail = async (req, res) => {
  try {
    const verificationCode = emailService.generateVerificationCode()

    const sendRequestDTO = new SendRequestDTO({ ...req.body, verificationCode })
    const verifyRequestDTO = new VerifyRequestDTO({ ...req.body, verificationCode })

    await emailService.sendEmail(sendRequestDTO, verifyRequestDTO)

    res.status(200).end()
  } catch (err) {
    logger.error(`router/email.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.verify = async (req, res) => {
  try {
    const verifyRequestDTO = new VerifyRequestDTO(req.params)

    await emailService.checkVerifyCode(verifyRequestDTO)

    await superagent.put(
      `localhost:${envProvider.common.port}/api/user/updateIsConfirm/${verifyRequestDTO.userId}`
      `http://${envProvider.common.endPoint}:${envProvider.common.port}/api/user/updateIsConfirm/${verifyRequestDTO.userId}`
    )

    const responseDTO = await emailService.deleteVerifyData(verifyRequestDTO)

    logger.info(`router/email.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/email.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
