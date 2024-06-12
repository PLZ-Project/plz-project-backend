class LoginRequestDTO {
  email

  password

  constructor(data) {
    this.email = data?.email
    this.password = data?.password
  }
}

module.exports = LoginRequestDTO
