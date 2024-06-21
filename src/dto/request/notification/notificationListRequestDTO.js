class NotificationListRequestDTO {
  userId

  constructor(data) {
    this.userId = data?.userId
  }
}

module.exports = NotificationListRequestDTO
