const { Op } = require('sequelize')
const { User, Board, Community, Article, Comment, Notification } = require('@models/index')

const UserCreateResponseDTO = require('@userResponseDTO/userCreateResponseDTO')
const UserReadResponseDTO = require('@userResponseDTO/userReadResponseDTO')
const UserUpdateResponseDTO = require('@userResponseDTO/userUpdateResponseDTO')
const UserDeleteResponseDTO = require('@userResponseDTO/userDeleteResponseDTO')

const UserReadNicknameListResponseDTO = require('@userResponseDTO/userReadNicknameListResponseDTO')

const userDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      User.create(requestDTO)
        .then((inserted) => {
          const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted))
          const userCreateResponseDTO = new UserCreateResponseDTO(newInserted)

          resolve(userCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfo: (requestDTO) =>
    new Promise((resolve, reject) => {
      User.findByPk(requestDTO.id, {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Community,
            as: 'Communities',
            attributes: Community.getIncludeAttributes()
          },
          {
            model: Board,
            as: 'Boards',
            attributes: Board.getIncludeAttributes()
          },
          {
            model: Article,
            as: 'Articles',
            attributes: Article.getIncludeAttributes()
          },
          {
            model: Comment,
            as: 'Comments',
            attributes: Comment.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          const userReadResponseDTO = new UserReadResponseDTO(selectedInfo)

          resolve(userReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfoByNickname: (requestDTO) =>
    new Promise((resolve, reject) => {
      User.findOne({
        where: { nickname: requestDTO.nickname },
        attributes: { exclude: ['password'] }
      })
        .then((selectedInfo) => {
          const userReadResponseDTO = new UserReadResponseDTO(selectedInfo)

          resolve(userReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfosByNickname: (requestDTO) => {
    const setQuery = {}

    setQuery.where = {
      ...setQuery.where,
      nickname: { [Op.iLike]: `%${requestDTO.nickname}%` }
    }

    return new Promise((resolve, reject) => {
      User.findAll({
        ...setQuery,
        attributes: ['id']
      })
        .then((selectedInfo) => {
          const idArray = selectedInfo.map((user) => user.id)

          const userReadNicknameListResponseDTO = new UserReadNicknameListResponseDTO({
            ids: idArray
          })

          resolve(userReadNicknameListResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  selectUser: (requestDTO) =>
    new Promise((resolve, reject) => {
      User.findOne({
        where: [{ email: requestDTO.email }]
      })
        .then((selectedInfo) => {
          const userReadResponseDTO = new UserReadResponseDTO(selectedInfo)

          resolve(userReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      User.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const userUpdateResponseDTO = new UserUpdateResponseDTO({ ...responseTokenDTO, updated })

          resolve(userUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      User.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const userDeleteResponeDTO = new UserDeleteResponseDTO({ responseTokenDTO, deleted })

          resolve(userDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      User.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const userDeleteResponeDTO = new UserDeleteResponseDTO({ responseTokenDTO, deleted })

          resolve(userDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = userDao
