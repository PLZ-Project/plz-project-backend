class BoardUpdateResponseDTO {
  updatedCount

  constructor(data) {
    this.updatedCount = data?.updated
  }
}

module.exports = BoardUpdateResponseDTO
