class verifyResponseDTO {
  id

  userId

  verificationCode

  constructor(data) {
    this.id = data?.id
    this.userId = data?.id
    this.verificationCode = data?.verificationCode
  }
}

module.exports = verifyResponseDTO
