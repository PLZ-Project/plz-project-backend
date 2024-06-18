const Sequelize = require('sequelize')

module.exports = class LikeNotification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        articleId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
    db.LikeNotification.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
    db.LikeNotification.belongsTo(db.Article, {
      foreignKey: { name: 'articleId', onDelete: 'CASCADE', as: 'Article' }
    })
  }
}
