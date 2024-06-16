class TagNotificationReadRequestDTO {
  targetId

  constructor(data) {
    this.targetId = data?.targetId
  }
}

module.exports = TagNotificationReadRequestDTO
