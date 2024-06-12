class BoardUpdateRequestDTO {
  id

  name

  constructor(data) {
    this.id = data?.id
    this.name = data?.name
  }
}

module.exports = BoardUpdateRequestDTO
