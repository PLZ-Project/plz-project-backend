class NotificationCreateRequestDTO {
  type

  userId

  targetId

  articleId

  commentId

  constructor(data) {
    this.type = data?.type
    this.userId = data?.userId
    this.targetId = data?.targetId
    this.articleId = data?.articleId
    this.commentId = data?.commentId
  }
}

module.exports = NotificationCreateRequestDTO
