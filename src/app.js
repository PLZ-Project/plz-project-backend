require('module-alias/register')

const path = require('path')
const express = require('express')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsConfig = require('./config/corsConfig.json')

const logger = require('./lib/logger')
const models = require('./models/index')

const indexRouter = require('./routes/index')

const app = express()

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

app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', indexRouter)

module.exports = app
