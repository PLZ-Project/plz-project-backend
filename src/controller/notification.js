const logger = require('@lib/logger')

const notificationService = require('@service/notificationService')

const NotificationCreateRequestDTO = require('@notificationRequestDTO/notificationCreateRequestDTO')
const NotificationReadRequestDTO = require('@notificationRequestDTO/notificationReadRequestDTO')
const NotificationListRequestDTO = require('@notificationRequestDTO/notificationListRequestDTO')

const { parseTaggedUsers } = require('@helper/mvcHelper')

exports.createCommentNotify = async (req, res) => {
  try {
    const tagRequestDTOList = await parseTaggedUsers(req)

    logger.info(`router/notification.tag.js ${JSON.stringify({ reqParams: tagRequestDTOList })}`)

    const tagNotificationResponseDTOList = tagRequestDTOList.map(async (requestDTO) => {
      const tagNotificationResponseDTO = await notificationService.regNotify(requestDTO)

      return tagNotificationResponseDTO
    })

    logger.info(`router/notification.js.result: ${JSON.stringify(tagNotificationResponseDTOList)}`)

    const commentRequestDTO = new NotificationCreateRequestDTO({
      type: 'comment',
      userId: req.tokenUser.id,
      targetId: req.body.writerId,
      articleId: req.body.articleId,
      commentId: req.body.id
    })

    logger.info(
      `router/notification.comment.js ${JSON.stringify({ reqParams: commentRequestDTO })}`
    )

    const commentNotificationResponseDTO = await notificationService.regNotify(commentRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(commentNotificationResponseDTO)}`)

    res.status(200).json({ tagNotificationResponseDTOList, commentNotificationResponseDTO })
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

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
    const likeRequestDTO = new NotificationCreateRequestDTO({
      userId: req.tokenUser.id,
      articleId: req.body.articleId
    })

    logger.info(`router/notification.comment.js ${JSON.stringify({ reqParams: likeRequestDTO })}`)

    const likeNotificationResponseDTO = await notificationService.regLIke(likeRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(likeNotificationResponseDTO)}`)

    res.status(200).json({ likeNotificationResponseDTO })
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
