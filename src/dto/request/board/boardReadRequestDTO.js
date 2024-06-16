class BoardReadRequestDTO {
  id

  name

  communityId

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.communityId = data?.communityId
  }
}

module.exports = BoardReadRequestDTO
