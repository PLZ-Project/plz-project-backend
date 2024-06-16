const Sequelize = require('sequelize')

const { Client } = require('@elastic/elasticsearch')

const envProvider = require('@lib/provider/envProvider')

const client = new Client({
  node: `http://${envProvider.common.host}:${envProvider.elasticSearch.port}`
})

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
        paranoid: true,
        hooks: {
          afterCreate: async (article) => {
            await client.index({
              index: 'articles',
              id: article.id,
              body: {
                title: article.title,
                content: article.content,
                userId: article.userId,
                boardId: article.boardId,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt
              }
            })
          },
          afterUpdate: async (article) => {
            await client.update({
              index: 'articles',
              id: article.id,
              body: {
                doc: {
                  title: article.title,
                  content: article.content,
                  userId: article.userId,
                  boardId: article.boardId,
                  createdAt: article.createdAt,
                  updatedAt: article.updatedAt
                }
              }
            })
          },
          afterDestroy: async (article) => {
            await client.delete({
              index: 'articles',
              id: article.id
            })
          }
        }
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
