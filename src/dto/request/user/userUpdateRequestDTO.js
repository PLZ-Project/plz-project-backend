class UserUpdateRequestDTO {
  id

  password

  nickname

  isConfirm

  constructor(data) {
    this.id = Number(data?.id)
    this.password = data?.password
    this.nickname = data?.nickname
    this.isConfirm = data?.isConfirm
  }
}

module.exports = UserUpdateRequestDTO
