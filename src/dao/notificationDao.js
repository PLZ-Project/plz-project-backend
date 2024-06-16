const { TagNotification, CommentNotification } = require('@models/index')

const TagNotificationCreateResponseDTO = require('@notificationResponseDTO/tagNotificationCreateResponseDTO')
const TagNotificationDeleteResponseDTO = require('@notificationResponseDTO/tagNotificationDeleteResponseDTO')

const CommentNotificationCreateResponseDTO = require('@notificationResponseDTO/commentNotificationCreateResponseDTO')
const CommentNotificationDeleteResponseDTO = require('@notificationResponseDTO/commentNotificationDeleteResponseDTO')

const notificationDao = {
  insertTag: (requestDTO) =>
    new Promise((resolve, reject) => {
      TagNotification.create(requestDTO)
        .then((inserted) => {
          const notificationCreateResponseDTO = new TagNotificationCreateResponseDTO(inserted)

          resolve(notificationCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  getTag: (requestDTO) =>
    new Promise((resolve, reject) => {
      TagNotification.findOne({
        where: { targetId: requestDTO.targetId },
        attributes: { exclude: ['password'] }
      })
        .then((selectedInfo) => {
          const tagNotificationCreateResponseDTO = new TagNotificationCreateResponseDTO(
            selectedInfo
          )

          resolve(tagNotificationCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  insertComment: (requestDTO) =>
    new Promise((resolve, reject) => {
      CommentNotification.create(requestDTO)
        .then((inserted) => {
          const notificationCreateResponseDTO = new CommentNotificationCreateResponseDTO(inserted)

          resolve(notificationCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteTag: (requestDTO) =>
    new Promise((resolve, reject) => {
      TagNotification.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const tagNotificationDeleteResponseDTO = new TagNotificationDeleteResponseDTO({ deleted })

          resolve(tagNotificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForceTag: (requestDTO) =>
    new Promise((resolve, reject) => {
      TagNotification.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const tagNotificationDeleteResponseDTO = new TagNotificationDeleteResponseDTO({ deleted })

          resolve(tagNotificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteComment: (requestDTO) =>
    new Promise((resolve, reject) => {
      CommentNotification.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const commentNotificationDeleteResponseDTO = new CommentNotificationDeleteResponseDTO({
            deleted
          })

          resolve(commentNotificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForceComment: (requestDTO) =>
    new Promise((resolve, reject) => {
      CommentNotification.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const commentNotificationDeleteResponseDTO = new CommentNotificationDeleteResponseDTO({
            deleted
          })

          resolve(commentNotificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = notificationDao
