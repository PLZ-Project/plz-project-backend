const redis = require('redis')
const nodemailer = require('nodemailer')

const envProvider = require('@provider/envProvider')

const redisConnector = {
  createRedisConnector: async () => {
    const client = await redis.createClient({
      socket: {
        port: envProvider.redis.port,
        host: envProvider.common.host
      },
      password: envProvider.common.password
    })

    await client.connect()

    return client
  },
  shutdown: async (client) => {
    await client.quit()
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: envProvider.mailer.gmailUser,
    clientId: envProvider.mailer.gmailClientId,
    clientSecret: envProvider.mailer.gmailClientSecret,
    refreshToken: envProvider.mailer.gmailRefreshToken
  }
})

module.exports = { redisConnector, transporter }
