class ArticleCreateResponseDTO {
  id

  userId

  boardId

  title

  content

  images

  hit

  constructor(data) {
    this.id = data?.id
    this.userId = data?.userId
    this.boardId = data?.boardId
    this.title = data?.title
    this.content = data?.content
    this.images = data?.images
    this.hit = data?.hit
  }
}

module.exports = ArticleCreateResponseDTO
