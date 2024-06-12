const logger = require('@lib/logger')

const middlewareHelper = {
  createError: (res, msg, status) => {
    const err = new Error(msg)

    logger.error(`middleware.js.isLoggedIn:${err.message.toString()}`)

    res.status(status).json({ err: err.message.toString() })
  }
}

module.exports = middlewareHelper
