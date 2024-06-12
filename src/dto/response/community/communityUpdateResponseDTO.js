class CommunityUpdateResponseDTO {
  updatedCount

  constructor(data) {
    this.updatedCount = data?.updated
  }
}

module.exports = CommunityUpdateResponseDTO
