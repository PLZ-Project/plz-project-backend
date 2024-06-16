const logger = require('@lib/logger')

const boardDao = require('@dao/boardDao')

const boardService = {
  reg: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await boardDao.insert(req.responseTokenDTO, requestDTO)

      logger.debug(`boardService.reg : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.reg: ${err}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  },
  list: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await boardDao.selectList(requestDTO)

      logger.debug(`boardService.list: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.list: ${err.message.toString()}`)

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
      responseDTO = await boardDao.selectInfo(requestDTO)

      logger.debug(`boardService.info: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.info: ${err.message.toString()}`)

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
      responseDTO = await boardDao.update(req.responseTokenDTO, requestDTO)

      logger.debug(`boardService.edit: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.edit: ${err.message.toString()}`)

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
      responseDTO = await boardDao.delete(req.responseTokenDTO, requestDTO)

      logger.debug(`boardService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.delete: ${err.message.toString()}`)

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
      responseDTO = await boardDao.deleteForce(req.responseTokenDTO, requestDTO)

      logger.debug(`boardService.delete: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`boardService.delete: ${err.message.toString()}`)

      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(responseDTO)
    })
  }
}

module.exports = boardService
