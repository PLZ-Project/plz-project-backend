class BoardCreateRequestDTO {
  userId

  communityId

  name

  constructor(data) {
    this.userId = data?.userId
    this.communityId = data?.communityId
    this.name = data?.name
  }
}

module.exports = BoardCreateRequestDTO
