class ArticleUpdateRequestDTO {
  id

  title

  content

  hit

  constructor(data) {
    this.id = data?.id
    this.title = data?.title
    this.content = data?.content
    this.hit = data?.hit
  }
}

module.exports = ArticleUpdateRequestDTO
