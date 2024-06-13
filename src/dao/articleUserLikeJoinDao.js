const { Op } = require('sequelize')
const { ArticleUserLikeJoin } = require('@models/index')

const articleUserLikeJoinDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.create(params)
        .then((inserted) => {
          resolve(inserted)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.destroy({
        where: { articleId: params.articleId, userId: params.userId }
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      ArticleUserLikeJoin.destroy({
        where: { articleId: params.articleId, userId: params.userId },
        force: true
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = articleUserLikeJoinDao
