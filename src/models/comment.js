const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
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
        content: {
          type: Sequelize.TEXT,
          allowNull: false
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
    db.Comment.belongsTo(db.User, {
      foreignKey: {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user'
      }
    })
    db.Comment.belongsTo(db.Article, {
      foreignKey: {
        foreignKey: 'articleId',
        onDelete: 'CASCADE',
        as: 'article'
      }
    })
    db.Comment.hasMany(db.TagNotification, {
      foreignKey: {
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
        as: 'tagNotifications'
      }
    })
  }

  static getIncludeAttributes() {
    return ['id', 'content', 'updatedAt', 'createdAt']
  }
}
