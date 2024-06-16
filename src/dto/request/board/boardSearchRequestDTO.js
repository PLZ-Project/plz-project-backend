class BoardSearchRequestDTO {
  communityId

  authorIds

  keyword

  searchType

  page

  limit

  constructor(data) {
    this.id = data.id
    this.communityId = data?.communityId
    this.authorIds = data?.authorIds
    this.keyword = data?.keyword
    this.searchType = data?.searchType
    this.page = data?.page ? Number(data.page) : 1
    this.limit = data?.limit ? Number(data.limit) : 8
  }
}

module.exports = BoardSearchRequestDTO
