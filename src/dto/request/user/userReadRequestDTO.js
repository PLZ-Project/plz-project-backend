class UserReadRequestDTO {
  id

  email

  nickname

  constructor(data) {
    this.id = data?.id
    this.email = data?.email
    this.nickname = data.nickname !== undefined ? data?.nickname : null
  }
}

module.exports = UserReadRequestDTO
