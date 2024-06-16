class CommentUpdateRequestDTO {
  id

  content

  constructor(data) {
    this.id = data?.id
    this.content = data?.content
  }
}

module.exports = CommentUpdateRequestDTO
