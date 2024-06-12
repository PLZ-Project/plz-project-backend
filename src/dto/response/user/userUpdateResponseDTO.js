class UserUpdateResponseDTO {
  updatedCount

  constructor(data) {
    this.updatedCount = data?.updated
  }
}

module.exports = UserUpdateResponseDTO
