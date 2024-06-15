class ArticleReadResponseDTO {
  id

  user

  board

  title

  content

  images

  hit

  likeUserList

  commentList

  responseToken

  constructor(data) {
    this.id = data?.id
    this.user = data?.User
    this.board = data?.Board
    this.title = data?.title
    this.content = data?.content
    this.images = data?.images
    this.hit = data?.hit
    this.likeUserList = data?.Likes
    this.commentList = data?.Comments
    this.responseToken = data?.responseToken
  }
}

module.exports = ArticleReadResponseDTO
