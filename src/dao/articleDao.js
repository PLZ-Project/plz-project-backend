const { Op } = require('sequelize')
const { Article, User, Board, Comment } = require('@models/index')

const ArticleCreateResponseDTO = require('@articleResponseDTO/articleCreateResponseDTO')
const ArticleReadResponseDTO = require('@articleResponseDTO/articleReadResponseDTO')
const ArticleUpdateResponseDTO = require('@articleResponseDTO/articleUpdateResponseDTO')
const ArticleDeleteResponseDTO = require('@articleResponseDTO/articleDeleteResponseDTO')

const articleDao = {
  insert: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.create(requestDTO)
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
    }),

  selectInfo: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.findByPk(requestDTO.id, {
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes()
          },
          {
            model: Board,
            as: 'Board',
            attributes: Board.getIncludeAttributes()
          },
          {
            model: Comment,
            as: 'Comments',
            attributes: Comment.getIncludeAttributes()
          },
          {
            model: User,
            as: 'Likes',
            attributes: User.getIncludeAttributes(),
            through: {
              attributes: []
            }
          }
        ]
      })
        .then((selectedInfo) => {
          const articleReadResponseDTO = new ArticleReadResponseDTO(responseTokenDTO, selectedInfo)

          resolve(articleReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const articleUpdateResponseDTO = new ArticleUpdateResponseDTO({
            responseTokenDTO,
            updated
          })

          resolve(articleUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const ArticleDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(ArticleDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const ArticleDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(ArticleDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = articleDao
