const dotenv = require('dotenv')

dotenv.config()

const envProvider = {
  common: {
    host: process.env.HOST,
    port: process.env.PORT,
    endPoint: process.env.END_POINT,
    password: process.env.PASSWORD,
    nodeEnv: process.env.NODE_ENV,
    loggerLevel: process.env.LOGGER_LEVEL
  },
  db: {
    id: process.env.DB_ID,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_DATABASE,
    redisPassword: process.env.REDIS_PASSWORD
  },
  redis: {
    port: process.env.REDIS_PORT
  },
  elasticSearch: {
    port: process.env.ELASTIC_PORT
  },
  hash: {
    iterations: Number(process.env.CRPYTO_ITERATIONS)
  },
  jwt: {
    secretKey: {
      accessKey: process.env.ACCESS_TOKEN_SECRET,
      refreshKey: process.env.REFRESH_TOKEN_SECRET
    },
    options: {
      accessTokenOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
      refreshTokenOptions: { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    }
  },
  mailer: {
    gmailUser: process.env.GMAIL_OAUTH_USER,
    gmailClientId: process.env.GMAIL_OAUTH_CLIENT_ID,
    gmailClientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
    gmailRefreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN
  },
  google: {
    callbackUrl: process.env.GOOGLE_LOGIN_CALLBACK_URL
  },
  session: {
    secretKey: process.env.SESSION_SECRET
  }
}

module.exports = envProvider
