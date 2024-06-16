class CommentUpdateResponseDTO {
  updatedCount

  constructor(data) {
    this.updatedCount = data?.updated
  }
}

module.exports = CommentUpdateResponseDTO
