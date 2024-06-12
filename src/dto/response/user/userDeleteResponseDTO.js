class UserDeleteResponseDTO {
  deletedCount

  constructor(data) {
    this.deletedCount = data?.deleted
  }
}

module.exports = UserDeleteResponseDTO
