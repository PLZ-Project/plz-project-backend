const Sequelize = require('sequelize')

module.exports = class EmailVerification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          comment: '유저 아이디'
        },
        verificationCode: {
          type: Sequelize.CHAR(8),
          comment: '인증번호'
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
    db.EmailVerification.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }
    })
  }

  static getIncludeAttributes() {
    return ['verificationCode', 'createdAt']
  }
}
