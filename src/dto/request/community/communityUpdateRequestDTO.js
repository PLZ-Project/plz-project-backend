class CommunityUpdateRequestDTO {
  id

  name

  thumbnailUrl

  backgroundUrl

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
  }
}

module.exports = CommunityUpdateRequestDTO
