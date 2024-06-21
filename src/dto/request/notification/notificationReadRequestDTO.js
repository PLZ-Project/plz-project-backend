class NotificationReadRequestDTO {
  type

  targetId

  commentId

  constructor(data) {
    this.type = 'tag'
    this.targetId = data?.userId
    this.commentId = data?.commentId
  }
}

module.exports = NotificationReadRequestDTO
