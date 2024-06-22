const { Op } = require('sequelize')
const { Article, User, Board, Comment } = require('@models/index')

const ArticleCreateResponseDTO = require('@articleResponseDTO/articleCreateResponseDTO')
const ArticleListResponseDTO = require('@articleResponseDTO/articleListResponseDTO')
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
  selectList(requestDTO) {
    const setQuery = {}

    if (requestDTO.boardId && requestDTO.boardId !== 'undefined') {
      setQuery.where = {
        ...setQuery.where,
        boardId: requestDTO.boardId
      }
    }

    if (requestDTO.searchType === 'title') {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.iLike]: `%${requestDTO.keyword}%` }
      }
    }

    if (requestDTO.searchType === 'content') {
      setQuery.where = {
        ...setQuery.where,
        content: { [Op.iLike]: `%${requestDTO.keyword}%` }
      }
    }

    if (requestDTO.searchType === 'title_content') {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.iLike]: `%${requestDTO.keyword}%` }
      }

      setQuery.where = {
        ...setQuery.where,
        content: { [Op.iLike]: `%${requestDTO.keyword}%` }
      }
    }

    if (requestDTO.searchType === 'author') {
      setQuery.where = {
        ...setQuery.where,
        userId: requestDTO.authorIds
      }
    }

    if (requestDTO.limit) {
      setQuery.limit = requestDTO.limit
    }

    if (requestDTO.page) {
      setQuery.offset = (requestDTO.page - 1) * requestDTO.limit
    }

    setQuery.order = [['id', 'DESC']]

    return new Promise((resolve, reject) => {
      Article.findAndCountAll({
        ...setQuery,
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
        .then((selectedList) => {
          const parsedData = JSON.parse(JSON.stringify(selectedList))

          const articleListResponseDTO = new ArticleListResponseDTO(parsedData)

          resolve(articleListResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
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
            attributes: User.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          const parsedData = JSON.parse(JSON.stringify(selectedInfo))
          const articleReadResponseDTO = new ArticleReadResponseDTO(parsedData)

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
