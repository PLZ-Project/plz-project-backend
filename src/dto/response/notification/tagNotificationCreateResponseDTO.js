class TagNotificationCreateResponseDTO {
  isRead

  userId

  targetId

  commentId

  constructor(data) {
    this.isRead = data?.isRead
    this.userId = data?.userId
    this.targetId = data?.targetId
    this.commentId = data?.commentId
  }
}

module.exports = TagNotificationCreateResponseDTO
