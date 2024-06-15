class CommunityCreateResponseDTO {
  id

  userId

  name

  thumbnailUrl

  backgroundUrl

  responseToken

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.name = data?.name
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = CommunityCreateResponseDTO
