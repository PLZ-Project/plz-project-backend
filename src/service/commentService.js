const logger = require('@lib/logger')

const commentDao = require('@dao/commentDao')

const commentService = {
  reg: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await commentDao.insert(req.responseTokenDTO, requestDTO)

      logger.debug(`commentService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`commentService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  list: async () => {
    let responseDTO = null

    try {
      responseDTO = await commentDao.selectList()

      logger.debug(`commentService.info: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`commentService.info: ${err.message.toString()}`)

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
      responseDTO = await commentDao.update(req.responseTokenDTO, requestDTO)

      logger.debug(`commentService.edit: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`commentService.edit: ${err.message.toString()}`)

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
      responseDTO = await commentDao.delete(req.responseTokenDTO, requestDTO)

      logger.debug(`commentService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`commentService.delete: ${err.message.toString()}`)

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
      responseDTO = await commentDao.deleteForce(req.responseTokenDTO, requestDTO)

      logger.debug(`commentService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`commentService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = commentService
