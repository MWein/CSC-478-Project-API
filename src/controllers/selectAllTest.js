import { selectAllRows } from '../db/queries'
import { sqlQuery } from '../db'

const testTableSelectAllController = async(req, res, next) => {
  const result = await sqlQuery(selectAllRows())
  const status = result.error ? 500 : 200

  res.status(status)
  res.json(result)

  next()
}

export default testTableSelectAllController
