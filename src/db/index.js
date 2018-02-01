// const { Pool } = require('pg')
// const { logger } = require('../middleware')
// const { findUserProvidedService } = require('../helpers/cfServices')

// const db = /* Connect to database */

// const pool = new Pool({
//   user: db.user,
//   host: db.host,
//   database: db.database,
//   password: db.password,
//   port: db.port,
// })

// // Fired when a new Client is connected.
// pool.on('connect', client => {
//   logger.info(`postgres client connected, total: ${pool.totalCount}`)

//   client.on('error', err => logger.info(`bizarre client error: ${err.message}`))
// })

// // Fired when an idle Client emits an error.
// pool.on('error', err => logger.error(`idle client error: ${err.message}`))

// // Fired when a Client is closed and removed from the pool.
// pool.on('remove', () => logger.info(`postgres client released, total: ${pool.totalCount}`))

// // Export the query function --- will execute a straight query
// // or a parameterized query. DOES NOT currently support transactions.
// const sqlQuery = async ({ text, values }) => {
//   try {
//     const client = await pool.connect()
//     const result = await client.query(text, values)

//     client.release()

//     return {
//       numRows: result.rowCount,
//       rows: result.rows,
//       error: false,
//       errorMsg: null,
//     }
//   } catch (e) {
//     logger.error(`sql error: ${e.message}`)

//     return {
//       numRows: 0,
//       rows: [],
//       error: true,
//       errorMsg: e.message,
//     }
//   }
// }

// module.exports = {
//   sqlQuery,
//   pool,
// }
