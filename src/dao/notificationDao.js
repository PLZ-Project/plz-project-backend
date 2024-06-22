const { Notification, User, Article } = require('@models/index')

const NotificationCreateResponseDTO = require('@notificationResponseDTO/notificationCreateResponseDTO')
const NotificationListResponseDTO = require('@notificationResponseDTO/notificationListResponseDTO')
const NotificationReadResponseDTO = require('@notificationResponseDTO/notificationReadResponseDTO')
const NotificationDeleteResponseDTO = require('@notificationResponseDTO/notificationDeleteResponseDTO')

const notificationDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      Notification.create(requestDTO)
        .then((inserted) => {
          const notificationCreateResponseDTO = new NotificationCreateResponseDTO(inserted)

          resolve(notificationCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  getList: (requestDTO) =>
    new Promise((resolve, reject) => {
      Notification.findAll({
        where: { targetId: requestDTO.userId },
        include: [
          {
            model: Article,
            as: 'Article',
            attributes: Article.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          const parsedData = JSON.parse(JSON.stringify(selectedInfo))
          const notificationListResponseDTO = new NotificationListResponseDTO(parsedData)

          resolve(notificationListResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  getTaggedNotify: (requestDTO) =>
    new Promise((resolve, reject) => {
      Notification.findOne({
        where: { type: 'tag', targetId: requestDTO.targetId, commentId: requestDTO.commentId }
      })
        .then((selectedInfo) => {
          const notificationReadResponseDTO = new NotificationReadResponseDTO(selectedInfo)

          resolve(notificationReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (requestDTO) =>
    new Promise((resolve, reject) => {
      Notification.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const notificationDeleteResponseDTO = new NotificationDeleteResponseDTO({ deleted })

          resolve(notificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (requestDTO) =>
    new Promise((resolve, reject) => {
      Notification.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const notificationDeleteResponseDTO = new NotificationDeleteResponseDTO({ deleted })

          resolve(notificationDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = notificationDao
