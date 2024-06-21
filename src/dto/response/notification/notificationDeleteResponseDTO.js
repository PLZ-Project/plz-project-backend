class NotificationDeleteResponseDTO {
  deletedCount

  constructor(data) {
    this.deletedCount = data?.deleted
  }
}

module.exports = NotificationDeleteResponseDTO
