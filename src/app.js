require('module-alias/register')

const fs = require('fs')
const path = require('path')
const express = require('express')
const passport = require('passport')

const https = require('https')
const socketIo = require('socket.io')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

const logger = require('@lib/logger')
const envProvider = require('@lib/provider/envProvider')

const models = require('@models/index')

const indexRouter = require('@routes/index')

const userDao = require('@dao/userDao')

const UserReadRequestDTO = require('@userRequestDTO/userReadRequestDTO')
const UserCreateRequestDTO = require('@userRequestDTO/userCreateRequestDTO')
const UserReadResponseDTO = require('@userResponseDTO/userReadResponseDTO')

const app = express()

try {
  const server = https.createServer(app)

  const io = socketIo(server)

  io.on('connection', (socket) => {
    console.log('Client connected')
    socket.on('newComment', (newComment) => {
      console.log('New comment:', newComment)
      socket.broadcast.to(newComment.articleId).emit('commentNotification', {
        message: `${newComment.author}님이 새로운 댓글을 달았습니다.`
      })
    })
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })

    server.on('error', (err) => {
      try {
        console.log('=======')
        console.log(err)
      } catch (error) {
        console.log(error)
      }
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
} catch (err) {
  console.log(err)
}

logger.info('app start')

models.sequelize
  .authenticate()
  .then(() => {
    logger.info('DB connection success')

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info('Sequelize sync success')
      })
      .catch((err) => {
        logger.error('Sequelize sync error', err)
      })
  })
  .catch((err) => {
    logger.error('DB Connection fail', err)
  })

app.use(
  session({
    secret: envProvider.session.secretKey,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID: envProvider.mailer.gmailClientId,
      clientSecret: envProvider.mailer.gmailClientSecret,
      callbackURL: envProvider.google.callbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const requestDTO = new UserReadRequestDTO({ email: profile.emails[0].value })
        const responseDTO = await userDao.selectUser(requestDTO)
        const readUserResponseDTO = new UserReadResponseDTO(responseDTO)

        if (!responseDTO.id) {
          const userCreateRequestDTO = new UserCreateRequestDTO({
            email: profile.emails[0].value,
            nickname: `shibaDog${new Date().getTime()}`,
            password: profile.id,
            isConfirm: true
          })

          const userResponseDTO = await userDao.insert(userCreateRequestDTO)

          done(null, userResponseDTO)
        }

        done(null, readUserResponseDTO)
      } catch (err) {
        done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const requestDTO = new UserReadRequestDTO({ id })
    const user = await userDao.selectInfo(requestDTO)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', indexRouter)

module.exports = app
