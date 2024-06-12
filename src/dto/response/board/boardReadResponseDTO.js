class BoardReadResponseDTO {
  id

  name

  user

  community

  articleList

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.user = data?.User
    this.community = data?.Community
    this.articleList = data?.Articles
  }
}

module.exports = BoardReadResponseDTO
