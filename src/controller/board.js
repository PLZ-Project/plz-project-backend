const superagent = require('superagent')

const logger = require('@lib/logger')

const boardService = require('@service/boardService')

const envProvider = require('@lib/provider/envProvider')

const BoardCreateRequestDTO = require('@boardRequestDTO/boardCreateRequestDTO')
const BoardReadRequestDTO = require('@boardRequestDTO/boardReadRequestDTO')
const BoardUpdateRequestDTO = require('@boardRequestDTO/boardUpdateRequestDTO')
const BoardDeleteRequestDTO = require('@boardRequestDTO/boardDeleteRequestDTO')

const BoardSearchRequestDTO = require('@boardRequestDTO/boardSearchRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createBoard = async (req, res) => {
  try {
    const requestDTO = new BoardCreateRequestDTO({ ...req.body, userId: req.tokenUser.id })

    logger.info(`router/board.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await boardService.reg(req, requestDTO)

    logger.info(`router/board.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/board.js.reg.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getList = async (req, res) => {
  try {
    const idArrayResponseDTO =
      req.query.searchType === 'author' &&
      (await superagent
        .get(`${envProvider.common.endPoint}:${envProvider.common.port}/api/user/getUsers/nickname`)
        .set('access_token', req.headers.access_token)
        .set('refresh_token', req.headers.refresh_token)
        .set('Accept', 'application/json')
        .query(req.query)
        .send())

    const requestDTO = idArrayResponseDTO
      ? new BoardSearchRequestDTO({
          ...req.query,
          authorIds: idArrayResponseDTO.body.ids
        })
      : new BoardSearchRequestDTO(req.query)

    logger.info(`router/board.js.list.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await boardService.list(requestDTO)

    logger.info(`router/board.js.list.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/board.js.list.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getBoard = async (req, res) => {
  try {
    const requestDTO = new BoardReadRequestDTO(req.params)

    logger.info(`router/board.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await boardService.info(requestDTO)

    logger.info(`router/board.js.info.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/board.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.modifyBoard = async (req, res) => {
  try {
    const requestDTO = new BoardUpdateRequestDTO({ ...req.body, ...req.params })

    logger.info(`router/board.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await boardService.edit(req, requestDTO)

    logger.info(`router/board.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/board.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteBoard = async (req, res) => {
  try {
    const requestDTO = new BoardDeleteRequestDTO(req.params)

    logger.info(`router/board.js.delete.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await boardService.delete(req, requestDTO)

    logger.info(`router/board.js.delete.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.deleteBoardForce = async (req, res) => {
  try {
    const requestDTO = new BoardDeleteRequestDTO(req.params)

    logger.info(`router/board.js.delete.params) ${JSON.stringify(requestDTO)}`)

    const responseDTO = await boardService.deleteForce(req, requestDTO)

    logger.info(`router/board.js.delete.result) ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
