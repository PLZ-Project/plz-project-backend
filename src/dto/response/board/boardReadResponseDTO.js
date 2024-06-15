class BoardReadResponseDTO {
  id

  name

  user

  community

  articleList

  responseToken

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
    this.user = data?.User
    this.community = data?.Community
    this.articleList = data?.Articles
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = BoardReadResponseDTO
