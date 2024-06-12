const cookieProvier = {
  setTokensToCookie: (res, tokens) => {
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: false
    })

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: false
    })
  },
  setAccessTokenToCookie: (res, token) => {
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: false
    })
  },
  setRefreshTokenToCookie: (res, token) => {
    res.cookie('refreshToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: false
    })
  },
  destroyTokenCookie: (res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
  }
}

module.exports = cookieProvier
