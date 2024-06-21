const logger = require('@lib/logger')

const notificationDao = require('@dao/notificationDao')

const notificationService = {
  regNotify: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.insert(requestDTO)

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
  regLikeNotify: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.insertLike(requestDTO)

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
  getNotify: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.getList(requestDTO)

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
  getTaggedNotify: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await notificationDao.getTaggedNotify(requestDTO)

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
  delete: async (requestDTO) => {
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
  deleteForce: async (requestDTO) => {
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
