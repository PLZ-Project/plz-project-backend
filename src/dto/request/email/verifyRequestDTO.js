class VerifyRequestDTO {
  userId

  verificationCode

  constructor(data) {
    this.userId = data?.id
    this.verificationCode = data?.verificationCode
  }
}

module.exports = VerifyRequestDTO
