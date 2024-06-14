const logger = require('@lib/logger')
const envProvider = require('@provider/envProvider')

const communityService = require('@service/communityService')

const CommunityCreateRequestDTO = require('@communityRequestDTO/communityCreateRequestDTO')
const CommunityReadRequestDTO = require('@communityRequestDTO/communityReadRequestDTO')
const CommunityUpdateRequestDTO = require('@communityRequestDTO/communityUpdateRequestDTO')
const CommunityDeleteRequestDTO = require('@communityRequestDTO/communityDeleteRequestDTO')

const { handleValidationError } = require('@helper/mvcHelper')

exports.createCommunity = async (req, res) => {
  try {
    if (
      !(
        req.files &&
        req.files.thumbnail &&
        req.files.thumbnail[0] &&
        req.files.background &&
        req.files.background[0]
      )
    ) {
      throw new Error('이미지를 업로드하지 않으셨습니다.')
    }

    req.body.userId = req.body.userId || req.tokenUser.id
    req.body.thumbnailUrl = `${envProvider.common.endPoint}:${envProvider.common.port}${req.files.thumbnail[0].savedFilePath}`
    req.body.backgroundUrl = `${envProvider.common.endPoint}:${envProvider.common.port}${req.files.background[0].savedFilePath}`

    const requestDTO = new CommunityCreateRequestDTO(req.body)

    logger.info(`router/community.js.reg.params: ${JSON.stringify(requestDTO)}}`)

    handleValidationError(requestDTO)

    const responseDTO = await communityService.reg(requestDTO)

    logger.info(`router/community.js.reg.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/community.js.reg.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.getCommunity = async (req, res) => {
  try {
    const requestDTO = new CommunityReadRequestDTO(req.params)

    logger.info(`router/community.js.info.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await communityService.info(requestDTO)

    logger.info(`router/community.js.info.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/community.js.info.error: ${err.message.toString()}`)
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.modifyCommunity = async (req, res) => {
  try {
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      req.body.thumbnailUrl = `${envProvider.common.endPoint}:${envProvider.common.port}${req.files.thumbnail[0].savedFilePath}`
    }

    if (req.files && req.files.background && req.files.background[0].savedFilePath) {
      req.body.backgroundUrl = `${envProvider.common.endPoint}:${envProvider.common.port}${req.files.background[0].savedFilePath}`
    }

    const requestDTO = new CommunityUpdateRequestDTO({ ...req.body, ...req.params })

    logger.info(`router/community.js.update.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await communityService.edit(requestDTO)

    logger.info(`router/community.js.update.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/community.js.update.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}

exports.deleteCommunity = async (req, res) => {
  try {
    const requestDTO = new CommunityDeleteRequestDTO(req.params)

    logger.info(`router/community.js.delete.params: ${JSON.stringify(requestDTO)}`)

    const responseDTO = await communityService.delete(requestDTO)

    logger.info(`router/community.js.delete.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}

exports.deleteCommunityForce = async (req, res) => {
  try {
    const requestDTO = new CommunityDeleteRequestDTO(req.params)

    logger.info(`router/community.js.delete.params) ${JSON.stringify(requestDTO)}`)

    const responseDTO = await communityService.deleteForce(requestDTO)

    logger.info(`router/community.js.delete.result) ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
