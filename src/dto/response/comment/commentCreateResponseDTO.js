class CommentCreateResponseDTO {
  id

  userId

  articleId

  content

  responseToken

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.articleId = data?.articleId
    this.content = data?.content
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = CommentCreateResponseDTO
