const logger = require('@lib/logger')

const notificationDao = require('@dao/notificationDao')

const notificationService = {
  regTag: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.insertTag(requestDTO)

      logger.debug(`notificationService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  getTag: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.getTag(requestDTO)

      logger.debug(`notificationService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  regComment: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.insertComment(requestDTO)

      logger.debug(`notificationService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  deleteTag: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.delete(requestDTO)

      logger.debug(`notificationService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  deleteComment: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.delete(requestDTO)

      logger.debug(`notificationService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  deleteForceTag: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.deleteForce(requestDTO)

      logger.debug(`notificationService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  deleteForceComment: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.deleteForce(requestDTO)

      logger.debug(`notificationService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`notificationService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = notificationService
