const { Comment, Article } = require('@models/index')

const CommentCreateResponseDTO = require('@commentResponseDTO/commentCreateResponseDTO')
const CommentListResponseDTO = require('@commentResponseDTO/commentListResponseDTO')
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
  selectList: () =>
    new Promise((resolve, reject) => {
      Comment.findAll({
        include: [
          {
            model: Article,
            as: 'Article',
            attributes: ['id']
          }
        ]
      })
        .then((selectedInfo) => {
          const parsedData = JSON.parse(JSON.stringify(selectedInfo))
          const commentListResponseDTO = new CommentListResponseDTO(parsedData)

          resolve(commentListResponseDTO)
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
