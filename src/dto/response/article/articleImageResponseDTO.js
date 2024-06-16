class articleImageResponseDTO {
  filename

  path

  constructor(data) {
    this.filename = data?.filename
    this.path = data?.path
  }
}

module.exports = articleImageResponseDTO
