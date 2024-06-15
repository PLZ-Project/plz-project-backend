class CommunityReadResponseDTO {
  id

  name

  user

  userId

  boardList

  thumbnailUrl

  backgroundUrl

  responseToken

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.user = data?.User
    this.boardList = data?.Boards
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = CommunityReadResponseDTO
