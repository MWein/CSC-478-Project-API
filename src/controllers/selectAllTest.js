import { selectAllRows } from '../db/queries'
import { sqlQuery } from '../db'

const testTableSelectAllController = async(req, res, next) => {
  const result = await sqlQuery(selectAllRows())

  res.status(result.error ? 500 : 200)
    .json(result)

  next()
}

export default testTableSelectAllController
