const Sequelize = require('sequelize')

module.exports = class Article extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        hit: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
    db.Article.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
    db.Article.belongsTo(db.Board, {
      foreignKey: { name: 'boardId', onDelete: 'CASCADE', as: 'Board' }
    })
    db.Article.hasMany(db.Comment, {
      foreignKey: { name: 'articleId', onDelete: 'CASCADE', as: 'Comments' }
    })

    db.Article.belongsToMany(db.User, {
      through: db.CommentNotification,
      foreignKey: 'articleId',
      otherKey: 'userId',
      as: 'CommentUserList'
    })
    db.Article.belongsToMany(db.User, {
      through: db.ArticleUserLikeJoin,
      foreignKey: 'articleId',
      otherKey: 'userId',
      as: 'Likes'
    })
  }

  static getIncludeAttributes() {
    return ['id', 'title', 'content', 'hit', 'createdAt', 'updatedAt']
  }
}
