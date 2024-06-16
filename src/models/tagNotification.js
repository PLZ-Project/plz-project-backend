const Sequelize = require('sequelize')

module.exports = class TagNotification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
        paranoid: true,
        indexes: [
          {
            unique: true,
            fields: ['comment_id', 'user_id', 'target_id']
          }
        ]
      }
    )
  }

  static associate(db) {
    db.TagNotification.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE',
        as: 'creatorUser'
      }
    })

    db.TagNotification.belongsTo(db.User, {
      foreignKey: {
        name: 'targetId',
        onDelete: 'CASCADE',
        as: 'targetUser'
      }
    })

    db.TagNotification.belongsTo(db.Comment, {
      foreignKey: {
        name: 'commentId',
        onDelete: 'CASCADE',
        as: 'comment'
      }
    })
  }
}
