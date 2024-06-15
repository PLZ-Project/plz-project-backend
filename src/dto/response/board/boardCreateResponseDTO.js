class BoardCreateResponseDTO {
  id

  userId

  communityId

  name

  responseToken

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.communityId = data?.communityId
    this.name = data?.name
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = BoardCreateResponseDTO
