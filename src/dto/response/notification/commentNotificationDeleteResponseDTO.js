class CommentNotificationDeleteResponseDTO {
  deletedCount

  constructor(data) {
    this.deletedCount = data?.deleted
  }
}

module.exports = CommentNotificationDeleteResponseDTO
