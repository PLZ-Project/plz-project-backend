const Sequelize = require('sequelize')

const envProvider = require('@provider/envProvider')

const db = {
  host: envProvider.common.host,
  port: envProvider.db.port,
  username: envProvider.db.id,
  password: envProvider.common.password,
  dialect: envProvider.db.dialect,
  database: envProvider.db.database
}

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect
})

exports.sequelize = sequelize
