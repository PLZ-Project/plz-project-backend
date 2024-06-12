const { Op } = require('sequelize')
const { Community, User, Board } = require('@models/index')

const CommunityCreateResponseDTO = require('@communityResponseDTO/communityCreateResponseDTO')
const CommunityReadResponseDTO = require('@communityResponseDTO/communityReadResponseDTO')
const CommunityUpdateResponseDTO = require('@communityResponseDTO/communityUpdateResponseDTO')
const CommunityDeleteResponseDTO = require('@communityResponseDTO/communityDeleteResponseDTO')

const communityDao = {
  insert: (requestDTO) =>
    new Promise((resolve, reject) => {
      Community.create(requestDTO)
        .then((inserted) => {
          const communityCreateResponseDTO = new CommunityCreateResponseDTO(inserted)

          resolve(communityCreateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  selectInfo: (requestDTO) =>
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
          const communityReadResponseDTO = new CommunityReadResponseDTO(selectedInfo)

          resolve(communityReadResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  update: (requestDTO) =>
    new Promise((resolve, reject) => {
      Community.update(requestDTO, {
        where: { id: requestDTO.id }
      })
        .then(([updated]) => {
          const communityUpdateResponseDTO = new CommunityUpdateResponseDTO({ updated })

          resolve(communityUpdateResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  delete: (requestDTO) =>
    new Promise((resolve, reject) => {
      Community.destroy({
        where: { id: requestDTO.id }
      })
        .then((deleted) => {
          const CommunityDeleteResponeDTO = new CommunityDeleteResponseDTO({ deleted })

          resolve(CommunityDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    }),
  deleteForce: (requestDTO) =>
    new Promise((resolve, reject) => {
      Community.destroy({
        where: { id: requestDTO.id },
        force: true
      })
        .then((deleted) => {
          const CommunityDeleteResponeDTO = new CommunityDeleteResponseDTO({ deleted })

          resolve(CommunityDeleteResponeDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

module.exports = communityDao
