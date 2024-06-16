class TagNotificationCreateRequestDTO {
  userId

  targetId

  commentId

  constructor(data) {
    this.userId = data?.userId
    this.targetId = data?.targetId
    this.commentId = data?.commentId
  }
}

module.exports = TagNotificationCreateRequestDTO
