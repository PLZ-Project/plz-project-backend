const superagent = require('superagent')

const logger = require('@lib/logger')

const articleService = require('@service/articleService')

const envProvider = require('@lib/provider/envProvider')

const ArticleCreateRequestDTO = require('@articleRequestDTO/articleCreateRequestDTO')
const ArticleReadRequestDTO = require('@articleRequestDTO/articleReadRequestDTO')
const ArticleUpdateRequestDTO = require('@articleRequestDTO/articleUpdateRequestDTO')
const ArticleDeleteRequestDTO = require('@articleRequestDTO/articleDeleteRequestDTO')

const ArticleSearchRequestDTO = require('@articleRequestDTO/articleSearchRequestDTO')

const ArticleLikeCreateRequestDTO = require('@articleRequestDTO/articleLikeCreateRequestDTO')
const ArticleLikeDeleteRequestDTO = require('@articleRequestDTO/articleLikeDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleCreateRequestDTO({ ...req.body, userId: req.tokenUser.id })

    logger.info(`router/article.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await articleService.reg(req, requestDTO)

    logger.info(`router/article.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js.reg.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.searchArticle = async (req, res) => {
  try {
    const idArrayResponseDTO =
      req.query.searchType === 'author' &&
      (await superagent
        .get(`${envProvider.common.endPoint}:${envProvider.common.port}/api/user/getUsers/nickname`)
        .query(req.query)
        .send())

    const requestDTO = idArrayResponseDTO
      ? new ArticleSearchRequestDTO({
          ...req.query,
          authorIds: idArrayResponseDTO.body.ids
        })
      : new ArticleSearchRequestDTO(req.query)

    const responseDTO = await articleService.searchArticle(requestDTO)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleReadRequestDTO(req.params)

    logger.info(`router/article.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.info(requestDTO)

    logger.info(`router/article.js.info.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.modifyArticleHit = async (req, res) => {
  try {
    const requestDTO = new ArticleUpdateRequestDTO({ ...req.body, ...req.params })

    logger.info(`router/article.js.updateHit.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.edit(req, requestDTO)

    logger.info(`router/article.js.updateHit.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js.updateHit.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.modifyArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleUpdateRequestDTO({ ...req.body, ...req.params })

    logger.info(`router/article.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.edit(req, requestDTO)

    logger.info(`router/article.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleDeleteRequestDTO(req.params)

    logger.info(`router/article.js.delete.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.delete(req, requestDTO)

    logger.info(`router/article.js.delete.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteArticleForce = async (req, res) => {
  try {
    const requestDTO = new ArticleDeleteRequestDTO(req.params)

    logger.info(`router/article.js.delete.params) ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.deleteForce(req, requestDTO)

    logger.info(`router/article.js.delete.result) ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.createArticleLike = async (req, res) => {
  try {
    const requestDTO = new ArticleLikeCreateRequestDTO({
      userId: req.tokenUser.id,
      articleId: req.params.id
    })

    handleValidationError(requestDTO)

    await superagent
      .post(`${envProvider.common.endPoint}:${envProvider.common.port}/api/notification/like`)
      .set('accesstoken', req.headers.accesstoken)
      .set('refreshtoken', req.headers.refreshtoken)
      .set('Accept', 'application/json')
      .send(requestDTO)

    logger.info(`router/article.js ${{ reqParams: JSON.stringify(requestDTO) }}`)

    const responseDTO = await articleService.regLike(req, requestDTO)
    logger.info(`router/article.js.regLike.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js: ${err.toString()}`)
    res.status(500).json({ err: err.toString() })
  }
}
exports.deleteArticleLike = async (req, res) => {
  try {
    const requestDTO = new ArticleLikeDeleteRequestDTO({
      userId: req.tokenUser.id,
      articleId: req.params.id
    })

    logger.info(`router/article.js ${{ requestDTO: JSON.stringify(requestDTO) }}`)

    const responseDTO = await articleService.cancelLike(req, requestDTO)
    logger.info(`router/article.js.deleteLike.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js: ${err.toString()}`)
    res.status(500).json({ err: err.toString() })
  }
}
