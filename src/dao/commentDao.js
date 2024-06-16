const { Op } = require('sequelize')
const { Comment, User, Article } = require('@models/index')

const CommentCreateResponseDTO = require('@commentResponseDTO/commentCreateResponseDTO')
const CommentReadResponseDTO = require('@commentResponseDTO/commentReadResponseDTO')
const CommentUpdateResponseDTO = require('@commentResponseDTO/commentUpdateResponseDTO')
const CommentDeleteResponseDTO = require('@commentResponseDTO/commentDeleteResponseDTO')

const commentDao = {
  insert: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Comment.create(requestDTO)
        .then((inserted) => {
          const commentCreateResponseDTO = new CommentCreateResponseDTO({
            responseTokenDTO,
            ...inserted.dataValues
          })

          resolve(commentCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfo: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Comment.findByPk(requestDTO.id, {
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes()
          },
          {
            model: Article,
            as: 'Article',
            attributes: Article.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          const commentReadResponseDTO = new CommentReadResponseDTO({
            responseTokenDTO,
            ...selectedInfo.dataValues
          })

          resolve(commentReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Comment.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const commentUpdateResponseDTO = new CommentUpdateResponseDTO({
            responseTokenDTO,
            updated
          })

          resolve(commentUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Comment.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const CommentDeleteResponeDTO = new CommentDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(CommentDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Comment.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const CommentDeleteResponeDTO = new CommentDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(CommentDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = commentDao
