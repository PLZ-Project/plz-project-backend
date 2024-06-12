require('winston-daily-rotate-file')

const fs = require('fs')

const { createLogger, format, transports } = require('winston')

const envProvider = require('./provider/envProvider')

const loggerLevel = envProvider.common.loggerLevel

const logDir = './src/log'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  format: format.combine(
    format.printf((info) => `${info.timestamp}[${info.level}] ${info.message}`)
  )
})

const logger = createLogger({
  level: loggerLevel,
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), format.json()),
  transports: [
    new transports.Console({
      level: loggerLevel,
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp}[${info.level}] ${info.message}`)
      )
    }),
    dailyRotateFileTransport
  ]
})

module.exports = logger
