const superagent = require('superagent')

const logger = require('@lib/logger')

const envProvider = require('@lib/provider/envProvider')

const commentService = require('@service/commentService')

const CommentCreateRequestDTO = require('@commentRequestDTO/commentCreateRequestDTO')
const CommentReadRequestDTO = require('@commentRequestDTO/commentReadRequestDTO')
const CommentUpdateRequestDTO = require('@commentRequestDTO/commentUpdateRequestDTO')
const CommentDeleteRequestDTO = require('@commentRequestDTO/commentDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createComment = async (req, res) => {
  try {
    const requestDTO = new CommentCreateRequestDTO({ ...req.body, userId: req.tokenUser.id })

    logger.info(`router/comment.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await commentService.reg(req, requestDTO)

    await superagent
      .post(`${envProvider.common.endPoint}:${envProvider.common.port}/api/notification/comment`)
      .set('access_token', req.headers.access_token)
      .set('refresh_token', req.headers.refresh_token)
      .set('Accept', 'application/json')
      .send({ ...responseDTO, articleId: req.body.articleId })

    logger.info(`router/comment.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/comment.js.reg.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getComment = async (req, res) => {
  try {
    const requestDTO = new CommentReadRequestDTO(req.params)

    logger.info(`router/comment.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await commentService.info(req, requestDTO)

    logger.info(`router/comment.js.info.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/comment.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.modifyComment = async (req, res) => {
  try {
    const requestDTO = new CommentUpdateRequestDTO({ ...req.body, ...req.params })

    logger.info(`router/comment.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await commentService.edit(req, requestDTO)

    await superagent
      .post(
        `${envProvider.common.endPoint}:${envProvider.common.port}/api/notification/resendComment`
      )
      .set('access_token', req.headers.access_token)
      .set('refresh_token', req.headers.refresh_token)
      .set('Accept', 'application/json')
      .send(requestDTO)

    logger.info(`router/comment.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/comment.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteComment = async (req, res) => {
  try {
    const requestDTO = new CommentDeleteRequestDTO(req.params)

    logger.info(`router/comment.js.delete.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await commentService.delete(req, requestDTO)

    logger.info(`router/comment.js.delete.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteCommentForce = async (req, res) => {
  try {
    const requestDTO = new CommentDeleteRequestDTO(req.params)

    logger.info(`router/comment.js.delete.params) ${JSON.stringify(requestDTO)}`)

    const responseDTO = await commentService.deleteForce(req, requestDTO)

    logger.info(`router/comment.js.delete.result) ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
