class UserCreateResponseDTO {
  id

  email

  nickname

  isConfirm

  role

  constructor(data) {
    this.id = data?.id
    this.email = data?.email
    this.nickname = data?.nickname
    this.isConfirm = data?.isConfirm
    this.role = data?.role
  }
}

module.exports = UserCreateResponseDTO
