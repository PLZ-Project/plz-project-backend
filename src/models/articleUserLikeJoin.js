const Sequelize = require('sequelize')

module.exports = class ArticleUserLikeJoin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        articleId: {
          type: Sequelize.INTEGER,
          unique: 'articleUserLikeUnique'
        },
        userId: {
          type: Sequelize.INTEGER,
          unique: 'articleUserLikeUnique'
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

  static associate(db) {}

  static getIncludeAttributes() {
    return ['id', 'articleId', 'userId', 'createdAt']
  }
}
