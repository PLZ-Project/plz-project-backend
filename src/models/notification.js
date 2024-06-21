const Sequelize = require('sequelize')

module.exports = class Notification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        articleId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        commentId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        targetId: {
          type: Sequelize.INTEGER,
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
    db.Notification.belongsTo(db.Article, {
      foreignKey: {
        name: 'articleId',
        onDelete: 'CASCADE',
        as: 'article'
      }
    })

    db.Notification.belongsTo(db.Comment, {
      foreignKey: {
        name: 'commentId',
        onDelete: 'CASCADE',
        as: 'comment'
      }
    })

    db.Notification.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE',
        as: 'User'
      }
    })

    db.Notification.belongsTo(db.User, {
      foreignKey: {
        name: 'targetId',
        onDelete: 'CASCADE'
      }
    })
  }
}
