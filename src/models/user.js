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
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'emailVerification' }
    })
    db.User.hasMany(db.Community, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'communities' }
    })
    db.User.hasMany(db.Board, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'boards' }
    })
    db.User.hasMany(db.Article, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'articles' }
    })
    db.User.hasMany(db.Comment, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'comments' }
    })

    db.User.hasMany(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: '' }
    })

    db.User.hasMany(db.Notification, {
      foreignKey: { name: 'targetId', onDelete: 'CASCADE', as: 'Notification' }
    })
  }

  static getIncludeAttributes() {
    return ['id', 'email', 'nickname', 'role']
  }
}
