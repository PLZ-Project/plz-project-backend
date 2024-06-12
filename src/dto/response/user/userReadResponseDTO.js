class UserReadResponseDTO {
  id

  email

  password

  nickname

  communityList

  boardList

  articleList

  commentList

  isConfirm

  role

  constructor(data) {
    this.id = data?.id
    this.email = data?.email
    this.password = data?.password
    this.nickname = data?.nickname
    this.communityList = data?.Communities
    this.boardList = data?.Boards
    this.articleList = data?.Articles
    this.commentList = data?.Comments
    this.isConfirm = data?.isConfirm
    this.role = data?.role
  }
}

module.exports = UserReadResponseDTO
