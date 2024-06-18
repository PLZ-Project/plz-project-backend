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
    console.log('🚀 ~ exports.sendEmail= ~ sendRequestDTO:', sendRequestDTO)
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
      `${envProvider.common.endPoint}:${envProvider.common.port}/api/user/updateIsConfirm/${verifyRequestDTO.userId}`
    )

    const responseDTO = await emailService.deleteVerifyData(verifyRequestDTO)

    logger.info(`router/email.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).send(`
        <html>
          <head>
              <title>API로 반환하는 HTML 페이지</title>
              <script>
                function closeWindow() {
                    window.close();
                }
              </script>
          </head>
          <body>
            <button onclick="closeWindow()">Close Window</button>
          </body>
        </html>
    `)
  } catch (err) {
    logger.error(`router/email.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
