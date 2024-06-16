class CommentCreateRequestDTO {
  userId

  articleId

  content

  constructor(data) {
    this.userId = data?.userId
    this.articleId = data?.articleId
    this.content = data?.content
  }
}

module.exports = CommentCreateRequestDTO
