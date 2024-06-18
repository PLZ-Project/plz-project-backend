const logger = require('@lib/logger')

const notificationService = require('@service/notificationService')

const TagNotificationReadRequestDTO = require('@notificationRequestDTO/tagNotificationReadRequestDTO')

const CommentNotificationCreateRequestDTO = require('@notificationRequestDTO/commentNotificationCreateRequestDTO')

const { parseTaggedUsers } = require('@helper/mvcHelper')
const LikeNotificationCreateRequestDTO = require('@notificationRequestDTO/likeNotificationDeleteRequestDTO')

exports.createCommentNotify = async (req, res) => {
  try {
    const tagRequestDTOList = await parseTaggedUsers(req)

    logger.info(`router/notification.tag.js ${JSON.stringify({ reqParams: tagRequestDTOList })}`)

    const tagNotificationResponseDTOList = tagRequestDTOList.map(async (requestDTO) => {
      const tagNotificationResponseDTO = await notificationService.regTag(requestDTO)

      return tagNotificationResponseDTO
    })

    logger.info(`router/notification.js.result: ${JSON.stringify(tagNotificationResponseDTOList)}`)

    const commentRequestDTO = new CommentNotificationCreateRequestDTO({
      userId: req.tokenUser.id,
      articleId: req.body.articleId
    })

    logger.info(
      `router/notification.comment.js ${JSON.stringify({ reqParams: commentRequestDTO })}`
    )

    const commentNotificationResponseDTO = await notificationService.regComment(commentRequestDTO)

    logger.info(`router/notification.js.result: ${JSON.stringify(commentNotificationResponseDTO)}`)

    res.status(200).json({ tagNotificationResponseDTOList, commentNotificationResponseDTO })
  } catch (err) {
    logger.error(`router/notification.js.error: ${err.message.toString()}`)

    res.status(500).json({ err: err.message.toString() })
  }
}
exports.getTaggedNotify = async (req, res) => {
  try {
    const tagNotificationReadRequestDTO = new TagNotificationReadRequestDTO({
      targetId: req.params.targetId
    })

    const responseDTO = await notificationService.getTag(tagNotificationReadRequestDTO)

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
      const tagNotificationResponseDTO = await notificationService.regTag(requestDTO)

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
    const likeRequestDTO = new LikeNotificationCreateRequestDTO({
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
