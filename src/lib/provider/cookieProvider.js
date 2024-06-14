const cookieProvier = {
  setTokensToCookie: (res, tokens, payload) => {
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    })

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    })

    res.cookie('userInfo', payload, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    })
  },
  setAccessTokenToCookie: (res, token) => {
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    })
  },
  setRefreshTokenToCookie: (res, token) => {
    res.cookie('refreshToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    })
  },
  destroyTokenCookie: (res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.clearCookie('userInfo')
  }
}

module.exports = cookieProvier
