class ArticleUpdateResponseDTO {
  updatedCount

  constructor(data) {
    this.updatedCount = data?.updated
  }
}

module.exports = ArticleUpdateResponseDTO
