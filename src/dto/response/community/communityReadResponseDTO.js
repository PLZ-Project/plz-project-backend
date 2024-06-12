class CommunityReadResponseDTO {
  id

  name

  user

  boardList

  thumbnailUrl

  backgroundUrl

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.user = data?.User
    this.boardList = data?.Boards
    this.thumbnailUrl = data?.thumbnailUrl
    this.backgroundUrl = data?.backgroundUrl
  }
}

module.exports = CommunityReadResponseDTO
