const { Op } = require('sequelize')
const { Board, User, Community, Article } = require('@models/index')

const BoardCreateResponseDTO = require('@boardResponseDTO/boardCreateResponseDTO')
const BoardReadResponseDTO = require('@boardResponseDTO/boardReadResponseDTO')
const BoardUpdateResponseDTO = require('@boardResponseDTO/boardUpdateResponseDTO')
const BoardDeleteResponseDTO = require('@boardResponseDTO/boardDeleteResponseDTO')

const boardDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      Board.create(requestDTO)
        .then((inserted) => {
          const boardCreateResponseDTO = new BoardCreateResponseDTO(inserted)

          resolve(boardCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),

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
          const boardReadResponseDTO = new BoardReadResponseDTO(selectedInfo)

          resolve(boardReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (requestDTO) =>
    new Promise((resolve, reject) => {
      Board.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const boardUpdateResponseDTO = new BoardUpdateResponseDTO({ updated })

          resolve(boardUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (requestDTO) =>
    new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const BoardDeleteResponeDTO = new BoardDeleteResponseDTO({ deleted })

          resolve(BoardDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (requestDTO) =>
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
