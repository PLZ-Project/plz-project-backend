const Sequelize = require('sequelize')

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        communityId: {
          type: Sequelize.INTEGER,
          comment: '커뮤니티 아이디'
        },
        userId: {
          type: Sequelize.INTEGER,
          comment: '유저 아이디'
        },
        name: {
          type: Sequelize.STRING(50),
          comment: '게시판 이름'
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
    db.Board.belongsTo(db.Community, {
      foreignKey: { name: 'communityId', onDelete: 'CASCADE', as: 'Community' }
    })
    db.Board.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
    db.Board.hasMany(db.Article, {
      foreignKey: { name: 'boardId', onDelete: 'CASCADE', as: 'Articles' }
    })
  }

  static getIncludeAttributes() {
    return ['id', 'name', 'createdAt', 'updatedAt']
  }
}
