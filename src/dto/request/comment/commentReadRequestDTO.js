class CommentReadRequestDTO {
  articleId

  constructor(data) {
    this.articleId = data?.id
  }
}

module.exports = CommentReadRequestDTO
