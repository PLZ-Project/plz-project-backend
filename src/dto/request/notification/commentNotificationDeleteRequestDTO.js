class CommentNotificationDeleteRequestDTO {
  userId

  articleId

  constructor(data) {
    this.userId = data?.userId
    this.articleId = data?.articleId
  }
}

module.exports = CommentNotificationDeleteRequestDTO
