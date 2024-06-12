const Sequelize = require('sequelize')

module.exports = class CommentNotification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
    db.CommentNotification.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
    db.CommentNotification.belongsTo(db.Article, {
      foreignKey: { name: 'articleId', onDelete: 'CASCADE', as: 'Article' }
    })
  }
}
