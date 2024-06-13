class ArticleCreateRequestDTO {
  userId

  boardId

  title

  content

  hit

  constructor(data) {
    this.userId = data?.userId
    this.boardId = data?.boardId
    this.title = data?.title
    this.content = data?.content
    this.hit = 0
  }
}

module.exports = ArticleCreateRequestDTO
