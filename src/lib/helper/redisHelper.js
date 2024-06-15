const logger = require('@lib/logger')

const { redisConnector } = require('@lib/connection/connectors')

const redisHelper = {
  setRedisData: async (id, refreshToken) => {
    try {
      const redisClient = await redisConnector.createRedisConnector()

      await redisClient.set(id.toString(), refreshToken, { EX: 60 * 60 * 24 * 7 })
      await redisConnector.shutdown(redisClient)
    } catch (err) {
      logger.error(`redis: ${err}`)
    }
  },
  getRedisData: async (id) => {
    try {
      const redisClient = await redisConnector.createRedisConnector()
      const storedRefreshToken = await redisClient.get(id.toString())

      await redisConnector.shutdown(redisClient)

      return storedRefreshToken
    } catch (err) {
      logger.error(`redis: ${err}`)
    }
  },
  delRedisData: async (id) => {
    const redisClient = await redisConnector.createRedisConnector()

    await redisClient.del(id.toString())
    await redisConnector.shutdown(redisClient)
  }
}

module.exports = redisHelper
