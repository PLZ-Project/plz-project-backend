const superagent = require('superagent')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

const envProvider = require('@lib/provider/envProvider')

const TagNotificationCreateRequestDTO = require('@notificationRequestDTO/tagNotificationCreateRequestDTO')

const mvcHelper = {
  handleValidationError: (params) => {
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        throw new Error(`Not allowed null (${key})`)
      }
    })
  },
  parseTaggedUsers: async (req) => {
    const parsedList = []
    const regex = /@([^\s]+)/g
    const matchedUsers = req.body.content.match(regex)
    const taggedUsers = matchedUsers != null ? matchedUsers.map((user) => user.substring(1)) : []

    for (const nickname of taggedUsers) {
      try {
        const user = await superagent
          .get(
            `${envProvider.common.endPoint}:${envProvider.common.port}/api/user/nickname/${nickname}`
          )
          .then((response) => JSON.parse(response.text))

        if (req.body.id && Object.keys(user).length !== 0) {
          const taggedUser = await superagent
            .get(
              `${envProvider.common.endPoint}:${envProvider.common.port}/api/notification/getTaggedNotify/${user.id}`
            )
            .then((response) => JSON.parse(response.text))
          if (
            Object.keys(taggedUser).length === 0 ||
            taggedUser.commentId !== Number(req.body.id)
          ) {
            parsedList.push(
              new TagNotificationCreateRequestDTO({
                userId: req.tokenUser.id,
                targetId: user.id,
                commentId: Number(req.body.id)
              })
            )
          } else {
            parsedList.push(
              new TagNotificationCreateRequestDTO({
                userId: req.tokenUser.id,
                targetId: user.id,
                commentId: Number(req.body.id)
              })
            )
          }
        }
      } catch (err) {
        throw new Error(err)
      }
    }

    return parsedList
  },
  upload: multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        const target = req.originalUrl.split('/')[2]

        const uploadPath = `/${target}/${file.fieldname}`
        const fullUploadPath = `public${uploadPath}/`

        fs.mkdirSync(fullUploadPath, { recursive: true })

        file.uploadPath = uploadPath
        file.fullUploadPath = fullUploadPath

        cb(null, fullUploadPath)
      },
      filename(req, file, cb) {
        const uniqueFilename = Date.now() + path.extname(file.originalname)
        file.savedFilePath = `${file.uploadPath}/${uniqueFilename}`
        cb(null, uniqueFilename)
      }
    })
  })
}

module.exports = mvcHelper
