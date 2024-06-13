const { Op } = require('sequelize')
const { Article, User, Board, Comment } = require('@models/index')

const ArticleCreateResponseDTO = require('@articleResponseDTO/articleCreateResponseDTO')
const ArticleReadResponseDTO = require('@articleResponseDTO/articleReadResponseDTO')
const ArticleUpdateResponseDTO = require('@articleResponseDTO/articleUpdateResponseDTO')
const ArticleDeleteResponseDTO = require('@articleResponseDTO/articleDeleteResponseDTO')

const articleDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.create(requestDTO)
        .then((inserted) => {
          const articleCreateResponseDTO = new ArticleCreateResponseDTO(inserted)

          resolve(articleCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),

  selectInfo: (requestDTO) =>
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
          const articleReadResponseDTO = new ArticleReadResponseDTO(selectedInfo)

          resolve(articleReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const articleUpdateResponseDTO = new ArticleUpdateResponseDTO({ updated })

          resolve(articleUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const ArticleDeleteResponeDTO = new ArticleDeleteResponseDTO({ deleted })

          resolve(ArticleDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const ArticleDeleteResponeDTO = new ArticleDeleteResponseDTO({ deleted })

          resolve(ArticleDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = articleDao
