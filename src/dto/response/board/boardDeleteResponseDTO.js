class BoardDeleteResponseDTO {
  deletedCount

  responseToken

  constructor(data) {
    this.deletedCount = data?.deleted
    this.responseToken = data?.responseTokenDTO
  }
}

module.exports = BoardDeleteResponseDTO
