const superagent = require('superagent')

const logger = require('@lib/logger')
const io = require('@lib/helper/socketHelper')
const envProvider = require('@lib/provider/envProvider')

const notificationService = require('@service/notificationService')

const NotificationCreateRequestDTO = require('@notificationRequestDTO/notificationCreateRequestDTO')
const NotificationReadRequestDTO = require('@notificationRequestDTO/notificationReadRequestDTO')
const NotificationListRequestDTO = require('@notificationRequestDTO/notificationListRequestDTO')

const { parseTaggedUsers } = require('@helper/mvcHelper')

exports.createCommentNotify = async (req, res) => {
  try {
    const tagRequestDTOList = await parseTaggedUsers(req)

    const tagResponseDTOList = await Promise.all(
      tagRequestDTOList.map(async (tagRequestDTO) => {
        const tagResponseDTO = await notificationService.regNotify(tagRequestDTO)

        io.emitToUser(tagResponseDTO.targetId, 'new_notification', tagResponseDTO)

        return tagResponseDTO
      })
    )

    const commentRequestDTO = new NotificationCreateRequestDTO({
      type: 'comment',
      userId: req.tokenUser.id,
      targetId: req.body.writerId,
      articleId: req.body.articleId,
      commentId: req.body.id
    })

    const commentResponseDTO = await notificationService.regNotify(commentRequestDTO)

    io.emitToUser(commentRequestDTO.targetId, 'new_notification', commentResponseDTO)

    res.status(200).json({ tagResponseDTOList, commentResponseDTO })
  } catch (err) {
    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getNotify = async (req, res) => {
  try {
    const notificationReadRequestDTO = new NotificationListRequestDTO(req.params)

    const responseDTO = await notificationService.getNotify(notificationReadRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getTaggedNotify = async (req, res) => {
  try {
    const notificationReadRequestDTO = new NotificationReadRequestDTO(req.params)

    const responseDTO = await notificationService.getTaggedNotify(notificationReadRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(responseDTO)}`)

    res.status(200).json(responseDTO)
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.resendCommentNotify = async (req, res) => {
  try {
    const tagRequestDTOList = await parseTaggedUsers(req)

    logger.info(`router/notification.tag.js ${JSON.stringify({ reqParams: tagRequestDTOList })}`)

    const tagNotificationResponseDTOList = tagRequestDTOList.map(async (requestDTO) => {
      const tagNotificationResponseDTO = await notificationService.regNotify(requestDTO)

      return tagNotificationResponseDTO
    })

    logger.info(`router/notification.js.result: ${JSON.stringify(tagNotificationResponseDTOList)}`)

    res.status(200).json({ tagNotificationResponseDTOList })
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.createLikeNotify = async (req, res) => {
  try {
    const articleResponseDTO = await superagent
      .get(
        `${envProvider.common.endPoint}:${envProvider.common.port}/api/article/${req.body.articleId}`
      )
      .then((response) => JSON.parse(response.text))

    const likeRequestDTO = new NotificationCreateRequestDTO({
      type: 'like',
      userId: req.tokenUser.id,
      targetId: articleResponseDTO.user.id,
      articleId: req.body.articleId
    })

    logger.info(`router/notification.comment.js ${JSON.stringify({ reqParams: likeRequestDTO })}`)

    const likeNotificationResponseDTO = await notificationService.regNotify(likeRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(likeNotificationResponseDTO)}`)

    res.status(200).json({ likeNotificationResponseDTO })
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
