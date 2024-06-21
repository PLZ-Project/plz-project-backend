class NotificationReadResponseDTO {
  userId

  commentId

  targetId

  articleId

  constructor(data) {
    this.userId = data?.userId
    this.targetId = data?.targetId
    this.articleId = data?.articleId
    this.commentId = data?.commentId
  }
}

module.exports = NotificationReadResponseDTO
