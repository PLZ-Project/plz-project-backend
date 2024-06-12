const { EmailVerification } = require('@models/index')

const VerifyResponseDTO = require('@emailResponseDTO/verifyResponseDTO')
const VerifyDeleteResponseDTO = require('@emailResponseDTO/verifyDeleteRequestDTO')

const emailDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      EmailVerification.create(requestDTO)
        .then((inserted) => {
          const verifyResponseDTO = new VerifyResponseDTO(inserted)

          resolve(verifyResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfo: (requestDTO) =>
    new Promise((resolve, reject) => {
      EmailVerification.findOne(requestDTO.id, {
        where: [{ userId: requestDTO.userId }]
      })
        .then((selectedInfo) => {
          const verifyResponseDTO = new VerifyResponseDTO(selectedInfo)

          resolve(verifyResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (requestDTO) =>
    new Promise((resolve, reject) => {
      EmailVerification.destroy({
        where: { verificationCode: requestDTO.verificationCode },
        force: true
      })
        .then((deleted) => {
          const verifyDeleteResponseDTO = new VerifyDeleteResponseDTO({ deleted })

          resolve(verifyDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = emailDao
