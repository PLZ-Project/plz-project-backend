class ArticleLikeDeleteResponseDTO {
  userId

  articleId

  responseToken

  constructor(data) {
    this.userId = data?.userId
    this.articleId = data?.articleId
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = ArticleLikeDeleteResponseDTO
