const logger = require('@lib/logger')

const articleDao = require('@dao/articleDao')
const articleUserLikeJoinDao = require('@dao/articleUserLikeJoinDao')

const articleService = {
  reg: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.insert(requestDTO)

      logger.debug(`articleService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },

  info: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.selectInfo(requestDTO)

      logger.debug(`articleService.info: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.info: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },

  edit: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.update(requestDTO)

      logger.debug(`articleService.edit: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.edit: ${err.message.toString()}`)

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
      responseDTO = await articleDao.delete(requestDTO)

      logger.debug(`articleService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.delete: ${err.message.toString()}`)

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
      responseDTO = await articleDao.deleteForce(requestDTO)

      logger.debug(`articleService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  regLike: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleUserLikeJoinDao.insert(requestDTO)

      logger.debug(`articleService.regLike : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.regLike: ${err}`)
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  cancelLike: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleUserLikeJoinDao.deleteForce(requestDTO)

      logger.debug(`articleService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.reg: ${err}`)
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = articleService
