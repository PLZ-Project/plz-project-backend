const { Client } = require('@elastic/elasticsearch')

const logger = require('@lib/logger')
const envProvider = require('@lib/provider/envProvider')

const { parseShould, parseBody } = require('@helper/mvcHelper')

const articleDao = require('@dao/articleDao')
const articleUserLikeJoinDao = require('@dao/articleUserLikeJoinDao')

const client = new Client({
  node: `http://${envProvider.common.host}:${envProvider.elasticSearch.port}`
})

const ArticleSearchResponseDTO = require('@articleResponseDTO/articleSearchResponseDTO')

const articleService = {
  reg: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.insert(req.responseTokenDTO, requestDTO)

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
  searchArticle: async (requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = articleDao.selectList(requestDTO)

      logger.debug(`articleService.list: ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.list: ${err.message.toString()}`)

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
      responseDTO = await articleDao.selectInfo(req.responseTokenDTO, requestDTO)

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
  edit: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.update(req.responseTokenDTO, requestDTO)

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
  delete: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.delete(req.responseTokenDTO, requestDTO)

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
  deleteForce: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleDao.deleteForce(req.responseTokenDTO, requestDTO)

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
  regLike: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleUserLikeJoinDao.insert(req.responseTokenDTO, requestDTO)

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
  cancelLike: async (req, requestDTO) => {
    let responseDTO = null

    try {
      responseDTO = await articleUserLikeJoinDao.deleteForce(req.responseTokenDTO, requestDTO)

      logger.debug(`articleService.cancel : ${JSON.stringify(responseDTO)}`)
    } catch (err) {
      logger.error(`articleService.cancel: ${err}`)
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
