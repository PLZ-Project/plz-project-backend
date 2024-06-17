const { Op } = require('sequelize')
const { Community, User, Board } = require('@models/index')

const CommunityCreateResponseDTO = require('@communityResponseDTO/communityCreateResponseDTO')
const CommunityListResponseDTO = require('@communityResponseDTO/communityListResponseDTO')
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
  selectList: (requestDTO) => {
    const setQuery = {}

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

    return new Promise((resolve, reject) => {
      setQuery.order = [['id', 'DESC']]

      Community.findAndCountAll({
        ...setQuery,
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
        .then((selectedList) => {
          const parsedData = JSON.parse(JSON.stringify(selectedList))
          const communityListResponseDTO = new CommunityListResponseDTO(parsedData)

          resolve(communityListResponseDTO)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
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
