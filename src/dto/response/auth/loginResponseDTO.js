class LoginResponseDTO {
  isSuccess

  constructor(data) {
    this.isSuccess = data?.isSuccess
  }
}

module.exports = LoginResponseDTO
