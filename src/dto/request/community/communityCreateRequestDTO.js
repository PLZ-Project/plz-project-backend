class CommunityCreateRequestDTO {
  userId

  name

  thumbnailUrl

  backgroundUrl

  constructor(data) {
    this.userId = data?.userId
    this.name = data?.name
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
  }
}

module.exports = CommunityCreateRequestDTO
