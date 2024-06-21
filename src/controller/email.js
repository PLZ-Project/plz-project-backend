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
    logger.error(`router/email.js.error: ${err.message ? err.message.toString() : 'Unknown error'}`)
    res.status(500).json({ err: err.message ? err.message.toString() : 'Unknown error' })
  }
}

exports.getEmailVerify = async (req, res) => {
  try {
    const verifyRequestDTO = new VerifyRequestDTO(req.params)

    const responseDTO = await emailService.getEmailVerify(verifyRequestDTO)

    logger.info(`router/email.js.update.result: ${JSON.stringify(responseDTO)}`)
    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/email.js.error: ${err.message ? err.message.toString() : 'Unknown error'}`)
    res.status(500).json({ err: err.message ? err.message.toString() : 'Unknown error' })
  }
}

exports.verify = async (req, res) => {
  try {
    const verifyRequestDTO = new VerifyRequestDTO(req.params)

    await emailService.checkVerifyCode(verifyRequestDTO)

    await superagent.put(
      `${envProvider.common.endPoint}:${envProvider.common.port}/api/user/updateIsConfirm/${verifyRequestDTO.userId}`
    )

    const responseDTO = await emailService.deleteVerifyData(verifyRequestDTO)
    logger.info(`router/email.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Closing...</title>
          <script>
            alert('이메일 인증이 완료되었습니다!');
            window.close();
          </script>
      </head>
      <body>
          <p>If the window does not close automatically, please close it manually.</p>
      </body>
      </html>
    `)
  } catch (err) {
    logger.error(`router/email.js.error: ${err.message ? err.message.toString() : 'Unknown error'}`)
    res.status(500).json({ err: err.message ? err.message.toString() : 'Unknown error' })
  }
}
