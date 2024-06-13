class ArticleDeleteResponseDTO {
  deletedCount

  constructor(data) {
    this.deletedCount = data?.deleted
  }
}

module.exports = ArticleDeleteResponseDTO
