class LikeNotificationCreateResponseDTO {
  id

  isRead

  userId

  articleId

  constructor(data) {
    this.id = data?.id
    this.isRead = data?.isRead
    this.userId = data?.userId
    this.articleId = data?.articleId
  }
}

module.exports = LikeNotificationCreateResponseDTO
