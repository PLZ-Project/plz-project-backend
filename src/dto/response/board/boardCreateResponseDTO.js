class BoardCreateResponseDTO {
  id

  userId

  communityId

  name

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.communityId = data?.communityId
    this.name = data?.name
  }
}

module.exports = BoardCreateResponseDTO
