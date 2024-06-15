const logger = require('@lib/logger')

const communityDao = require('@dao/communityDao')

const communityService = {
  reg: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await communityDao.insert(req.responseTokenDTO, requestDTO)

      logger.debug(`communityService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`communityService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },

  info: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await communityDao.selectInfo(req.responseTokenDTO, requestDTO)

      logger.debug(`communityService.info: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`communityService.info: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },

  edit: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await communityDao.update(req.responseTokenDTO, requestDTO)

      logger.debug(`communityService.edit: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`communityService.edit: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  delete: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await communityDao.delete(req.responseTokenDTO, requestDTO)

      logger.debug(`communityService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`communityService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  deleteForce: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await communityDao.deleteForce(requestDTO)

      logger.debug(`communityService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`communityService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = communityService
