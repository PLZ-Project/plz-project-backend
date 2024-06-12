class VerifyDeleteResponseDTO {
  deletedCount

  constructor(data) {
    this.deletedCount = data?.deleted
  }
}

module.exports = VerifyDeleteResponseDTO
