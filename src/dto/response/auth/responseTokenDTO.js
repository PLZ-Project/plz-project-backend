class ResponseTokenDTO {
  accessToken

  refreshToken

  constructor(data) {
    this.accessToken = data?.accessToken
    this.refreshToken = data?.refreshToken
  }
}

module.exports = ResponseTokenDTO
