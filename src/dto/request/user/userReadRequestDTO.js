class UserReadRequestDTO {
  id

  email

  nickname

  constructor(data) {
    this.id = data?.id
    this.email = data?.email
    this.nickname = data?.nickname
  }
}

module.exports = UserReadRequestDTO
