class UserCreateRequestDTO {
  email

  password

  nickname

  isConfirm

  role

  constructor(data) {
    this.email = data?.email
    this.password = data?.password
    this.nickname = `shibaDog${new Date().getTime()}`
    this.isConfirm = data?.isConfirm || false
    this.role = 'USER'
  }
}

module.exports = UserCreateRequestDTO
