class ArticleSearchResponseDTO {
  total

  articles

  constructor(data) {
    this.total = data?.total.value
    this.articles = data?.hits.map((article) => article._source) || []
  }
}

module.exports = ArticleSearchResponseDTO
