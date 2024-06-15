class LoginResponseDTO {
  isSuccess

  accessToken

  refreshToken

  userInfo

  constructor(data) {
    this.isSuccess = !!data?.accessToken
    this.accessToken = data?.accessToken
    this.refreshToken = data?.refreshToken
    this.userInfo = data?.userInfo
  }
}

module.exports = LoginResponseDTO
