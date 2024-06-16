class CommentCreateResponseDTO {
  id

  user

  article

  content

  constructor(data) {
    this.id = data?.id
    this.user = data?.User
    this.article = data?.Article
    this.content = data?.content
  }
}

module.exports = CommentCreateResponseDTO
