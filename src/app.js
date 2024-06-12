require('module-alias/register')

const path = require('path')
const express = require('express')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsConfig = require('@config/corsConfig.json')

const logger = require('@lib/logger')

const indexRouter = require('@routes/index')

const app = express()

logger.info('app start')

app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', indexRouter)

module.exports = app
