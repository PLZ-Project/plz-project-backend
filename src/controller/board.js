const logger = require('@lib/logger')

const boardService = require('@service/boardService')

const BoardCreateRequestDTO = require('@boardRequestDTO/boardCreateRequestDTO')
const BoardReadRequestDTO = require('@boardRequestDTO/boardReadRequestDTO')
const BoardUpdateRequestDTO = require('@boardRequestDTO/boardUpdateRequestDTO')
const BoardDeleteRequestDTO = require('@boardRequestDTO/boardDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createBoard = async (req, res) => {
  try {
    const requestDTO = new BoardCreateRequestDTO({ ...req.body, userId: req.tokenUser.id })

    logger.info(`router/board.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await boardService.reg(requestDTO)

    logger.info(`router/board.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/board.js.reg.error: ${err.message.toString()}`)
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

    const responseDTO = await boardService.edit(requestDTO)

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

    const responseDTO = await boardService.delete(requestDTO)

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

    const responseDTO = await boardService.deleteForce(requestDTO)

    logger.info(`router/board.js.delete.result) ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
