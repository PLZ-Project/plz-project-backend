class ArticleSearchRequestDTO {
  boardId

  authorIds

  keyword

  searchType

  page

  limit

  constructor(data) {
    this.boardId = data?.boardId
    this.authorIds = data?.authorIds
    this.keyword = data?.keyword
    this.searchType = data?.searchType
    this.page = data?.page ? Number(data.page) : 1
    this.limit = data?.limit ? Number(data.limit) : 3
  }
}

module.exports = ArticleSearchRequestDTO
