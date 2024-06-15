const { ArticleUserLikeJoin } = require('@models/index')

const ArticleCreateResponseDTO = require('@articleResponseDTO/articleCreateResponseDTO')
const ArticleDeleteResponseDTO = require('@articleResponseDTO/articleDeleteResponseDTO')

const articleUserLikeJoinDao = {
  insert(responseTokenDTO, requestDTO) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.create(requestDTO)
        .then((inserted) => {
          const articleCreateResponseDTO = new ArticleCreateResponseDTO({
            responseTokenDTO,
            ...inserted.dataValues
          })
          resolve(articleCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  delete(responseTokenDTO, requestDTO) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.destroy({
        where: { articleId: requestDTO.articleId, userId: requestDTO.userId }
      })
        .then((deleted) => {
          const articleDeleteResponseDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })
          resolve(articleDeleteResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteForce(responseTokenDTO, requestDTO) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.destroy({
        where: { articleId: requestDTO.articleId, userId: requestDTO.userId },
        force: true
      })
        .then((deleted) => {
          const articleDeleteResponseDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve({ articleDeleteResponseDTO })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = articleUserLikeJoinDao
