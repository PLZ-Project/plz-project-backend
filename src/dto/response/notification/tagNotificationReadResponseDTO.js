class TagNotificationReadResponseDTO {
  userId

  targetId

  articleId

  constructor(data) {
    this.userId = data?.userId
    this.targetId = data?.targetId
    this.articleId = data?.articleId
  }
}

module.exports = TagNotificationReadResponseDTO
