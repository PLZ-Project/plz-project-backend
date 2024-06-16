const { Op } = require('sequelize')
const { Board, User, Community, Article } = require('@models/index')

const BoardCreateResponseDTO = require('@boardResponseDTO/boardCreateResponseDTO')
const BoardReadResponseDTO = require('@boardResponseDTO/boardReadResponseDTO')
const BoardUpdateResponseDTO = require('@boardResponseDTO/boardUpdateResponseDTO')
const BoardDeleteResponseDTO = require('@boardResponseDTO/boardDeleteResponseDTO')

const boardDao = {
  insert: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Board.create(requestDTO)
        .then((inserted) => {
          const boardCreateResponseDTO = new BoardCreateResponseDTO({
            responseTokenDTO,
            ...inserted.dataValues
          })

          resolve(boardCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectList: (requestDTO) => {
    const setQuery = {}

    if (requestDTO.communityId) {
      setQuery.where = {
        ...setQuery.where,
        communityId: requestDTO.communityId
      }
    }

    if (requestDTO.searchType === 'author') {
      setQuery.where = {
        ...setQuery.where,
        userId: requestDTO.authorIds
      }
    }

    if (requestDTO.searchType === 'name') {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.iLike]: `%${requestDTO.keyword}%` }
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
      Board.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes()
          },
          {
            model: Community,
            as: 'Community',
            attributes: Community.getIncludeAttributes()
          },
          {
            model: Article,
            as: 'Articles',
            attributes: Article.getIncludeAttributes()
          }
        ]
      })
        .then((selectedList) => {
          resolve(selectedList)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  selectInfo: (requestDTO) =>
    new Promise((resolve, reject) => {
      Board.findByPk(requestDTO.id, {
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes()
          },
          {
            model: Community,
            as: 'Community',
            attributes: Community.getIncludeAttributes()
          },
          {
            model: Article,
            as: 'Articles',
            attributes: Article.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          const boardReadResponseDTO = new BoardReadResponseDTO({ ...selectedInfo })

          resolve(boardReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Board.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const boardUpdateResponseDTO = new BoardUpdateResponseDTO({ responseTokenDTO, updated })

          resolve(boardUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const BoardDeleteResponeDTO = new BoardDeleteResponseDTO({ responseTokenDTO, deleted })

          resolve(BoardDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const BoardDeleteResponeDTO = new BoardDeleteResponseDTO({ deleted })

          resolve(BoardDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = boardDao
