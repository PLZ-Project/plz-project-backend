const { sequelize } = require('./connection')

const User = require('./user')
const Board = require('./board')
const Article = require('./article')
const Comment = require('./comment')
const Community = require('./community')
const Notification = require('./notification')
const EmailVerification = require('./emailVerification')
const ArticleUserLikeJoin = require('./articleUserLikeJoin')

const db = {}

db.sequelize = sequelize

db.User = User
db.Board = Board
db.Article = Article
db.Comment = Comment
db.Community = Community
db.Notification = Notification
db.EmailVerification = EmailVerification
db.ArticleUserLikeJoin = ArticleUserLikeJoin

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize)
  }
})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db
