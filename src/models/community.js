const Sequelize = require('sequelize')

module.exports = class Community extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          comment: '생성자 아이디'
        },
        name: {
          type: Sequelize.STRING(50),
          comment: '커뮤니티 이름'
        },
        thumbnailUrl: {
          type: Sequelize.TEXT,
          comment: '썸네일 경로'
        },
        backgroundUrl: {
          type: Sequelize.TEXT,
          comment: '배경 이미지 경로'
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
    db.Community.belongsTo(db.User, { foreignKey: 'userId', as: 'User' })
    db.Community.hasMany(db.Board, {
      foreignKey: { name: 'communityId', onDelete: 'CASCADE', as: 'Boards' }
    })
  }

  static getIncludeAttributes() {
    return ['id', 'name', 'thumbnailUrl', 'backgroundUrl', 'createdAt', 'updatedAt']
  }
}
