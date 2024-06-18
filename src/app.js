require('module-alias/register')

const path = require('path')
const express = require('express')
const passport = require('passport')

const http = require('http')
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
const server = http.createServer(app)
const io = socketIo(server)
console.log('🚀 ~ io:', io)

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('newComment', (newComment) => {
    // 여기서 newComment를 받아서 처리하고, 필요한 경우 다시 클라이언트에게 보내줄 수 있음
    console.log('New comment:', newComment)
    // 게시글 작성자에게만 알림을 보내는 예시
    socket.broadcast.to(newComment.articleId).emit('commentNotification', {
      message: `${newComment.author}님이 새로운 댓글을 달았습니다.`
    })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

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
