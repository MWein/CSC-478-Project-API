import { Pool } from 'pg'

require('dotenv').config()
const getHost = () => {
  if (process.env.NODE_ENV.includes('np')) {
    return process.env.DB_HOST_NP
  } else if (process.env.NODE_ENV.includes('prod')) {
    return process.env.DB_HOST_P
  }
}

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: getHost(),
  port: process.env.DB_PORT,
})

const sqlQuery = async({ text, values }) => {
  const client = await pool.connect()

  try {
    const result = await client.query(text, values)

    await client.release()

    console.log('Hello')

    return {
      numRows: result.rowCount,
      rows: result.rows,
      error: false,
      errorMsg: null,
    }
  } catch (e) {

    await client.release()

    return {
      numRows: 0,
      rows: [],
      error: true,
      errorMsg: e.message,
    }
  }
}

module.exports = {
  sqlQuery,
  pool,
}
