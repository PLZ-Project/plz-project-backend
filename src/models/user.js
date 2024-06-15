const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          comment: '유저 이메일'
        },
        nickname: {
          type: Sequelize.STRING(50),
          comment: '유저 닉네임'
        },
        password: {
          type: Sequelize.STRING(500),
          comment: '유저 비밀번호'
        },
        isConfirm: {
          type: Sequelize.BOOLEAN,
          comment: '인증 여부'
        },
        role: {
          type: Sequelize.STRING(50),
          comment: '유저 권한'
        }
      },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true
      }
    )
  }

  static associate(db) {
    db.User.hasOne(db.EmailVerification, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'EmailVerification' }
    })
    db.User.hasMany(db.Community, {
      foreignKey: { name: 'userId', as: 'Communities' }
    })
    db.User.hasMany(db.Board, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'Boards' }
    })
    db.User.hasMany(db.Article, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'Articles' }
    })
    db.User.hasMany(db.Comment, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'Comments' }
    })
    db.User.hasOne(db.TagNotification, {
      foreignKey: { name: 'targetId', onDelete: 'CASCADE', as: 'ReceivedTagNotification' },
      as: 'TagNotifications2'
    })
    db.User.belongsToMany(db.Article, {
      through: db.CommentNotification,
      foreignKey: 'articleId',
      otherKey: 'userId',
      as: 'CommentNotifications'
    })
    db.User.belongsToMany(db.Comment, {
      through: db.TagNotification,
      foreignKey: 'userId',
      otherKey: 'commentId',
      as: 'TagNotifications'
    })
    db.User.belongsToMany(db.Article, {
      through: db.ArticleUserLikeJoin,
      foreignKey: 'userId',
      otherKey: 'articleId',
      as: 'LikeArticles'
    })
  }

  static getIncludeAttributes() {
    return ['id', 'email', 'nickname', 'role']
  }
}
