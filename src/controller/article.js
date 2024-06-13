const logger = require('@lib/logger')

const articleService = require('@service/articleService')

const ArticleCreateRequestDTO = require('@articleRequestDTO/articleCreateRequestDTO')
const ArticleReadRequestDTO = require('@articleRequestDTO/articleReadRequestDTO')
const ArticleUpdateRequestDTO = require('@articleRequestDTO/articleUpdateRequestDTO')
const ArticleDeleteRequestDTO = require('@articleRequestDTO/articleDeleteRequestDTO')

const ArticleLikeCreateRequestDTO = require('@likeRequestDTO/articleLikeCreateRequestDTO')
const ArticleLikeDeleteRequestDTO = require('@likeRequestDTO/articleLikeDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleCreateRequestDTO({ ...req.body, userId: req.tokenUser.id })

    logger.info(`router/article.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await articleService.reg(requestDTO)

    logger.info(`router/article.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js.reg.error: ${err.message.toString()}`)
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

exports.modifyArticle = async (req, res) => {
  try {
    const oldArticle = await articleService.getArticle({ id: req.body.id })

    const requestDTO = new ArticleUpdateRequestDTO({
      ...req.body,
      ...req.params,
      hit: oldArticle.hit + 1
    })

    logger.info(`router/article.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await articleService.edit(requestDTO)

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

    const responseDTO = await articleService.delete(requestDTO)

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

    const responseDTO = await articleService.deleteForce(requestDTO)

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

    logger.info(`router/article.js ${{ reqParams: JSON.stringify(requestDTO) }}`)

    const responseDTO = await articleService.regLike(requestDTO)
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
      postId: req.params.id
    })

    logger.info(`router/article.js ${{ requestDTO: JSON.stringify(requestDTO) }}`)

    const responseDTO = await articleService.cancelLike(requestDTO)
    logger.info(`router/article.js.deleteLike.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/article.js: ${err.toString()}`)
    res.status(500).json({ err: err.toString() })
  }
}
