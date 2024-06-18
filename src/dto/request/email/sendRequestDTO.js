const envProvider = require('@provider/envProvider')

class SendRequestDTO {
  to

  subject

  html

  constructor(data) {
    this.to = data?.email
    this.subject = '[PLZ] 회원가입 이메일 인증 메일입니다.'
    this.html = `인증링크 : <a href=http://${envProvider.common.endPoint}:${envProvider.common.port}/api/email/emailVerify/${data?.id}/${data?.verificationCode}">여기를 눌러주세요</a>`
  }
}

module.exports = SendRequestDTO
