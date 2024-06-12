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
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
    db.Comment.belongsTo(db.Article, {
      foreignKey: { name: 'articleId', onDelete: 'CASCADE', as: 'User' }
    })
    db.Comment.belongsToMany(db.User, {
      through: db.TagNotification,
      foreignKey: 'commentId',
      otherKey: 'userId',
      as: 'TagUserList'
    })
  }

  static getIncludeAttributes() {
    return ['id', 'content', 'updatedAt', 'createdAt']
  }
}
