class CommunityCreateResponseDTO {
  id

  userId

  name

  thumbnailUrl

  backgroundUrl

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.name = data?.name
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
  }
}

module.exports = CommunityCreateResponseDTO
