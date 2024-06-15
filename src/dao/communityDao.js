const { Op } = require('sequelize')
const { Community, User, Board } = require('@models/index')

const CommunityCreateResponseDTO = require('@communityResponseDTO/communityCreateResponseDTO')
const CommunityReadResponseDTO = require('@communityResponseDTO/communityReadResponseDTO')
const CommunityUpdateResponseDTO = require('@communityResponseDTO/communityUpdateResponseDTO')
const CommunityDeleteResponseDTO = require('@communityResponseDTO/communityDeleteResponseDTO')

const communityDao = {
  insert: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Community.create(requestDTO)
        .then((inserted) => {
          const communityCreateResponseDTO = new CommunityCreateResponseDTO({
            responseTokenDTO,
            ...inserted.dataValues
          })

          resolve(communityCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfo: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Community.findByPk(requestDTO.id, {
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes()
          },
          {
            model: Board,
            as: 'Boards',
            attributes: Board.getIncludeAttributes()
          }
        ]
      })
        .then((selectedInfo) => {
          if (selectedInfo) {
            const communityReadResponseDTO = new CommunityReadResponseDTO({
              responseTokenDTO,
              ...selectedInfo.dataValues
            })
            resolve(communityReadResponseDTO)
          } else {
            reject(new Error('Community not found'))
          }
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Community.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const communityUpdateResponseDTO = new CommunityUpdateResponseDTO({
            responseTokenDTO,
            updated
          })

          resolve(communityUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Community.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const CommunityDeleteResponeDTO = new CommunityDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(CommunityDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Community.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const CommunityDeleteResponeDTO = new CommunityDeleteResponseDTO({
            responseTokenDTO,
            deleted
          })

          resolve(CommunityDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = communityDao
