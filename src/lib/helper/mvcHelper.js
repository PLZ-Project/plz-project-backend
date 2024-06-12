const fs = require('fs')
const path = require('path')
const multer = require('multer')

const mvcHelper = {
  handleValidationError: (params) => {
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        throw new Error(`Not allowed null (${key})`)
      }
    })
  },
  parseTaggedUsers: (commentContent) => {
    const regex = /@([^\s]+)/g
    const matchedUsers = commentContent.match(regex)
    const taggedUsers = matchedUsers.map((user) => user.substring(1))

    return taggedUsers
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
