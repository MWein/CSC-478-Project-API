import { selectAllRows } from '../db/queries'
import { sqlQuery } from '../db'

const testTableSelectAllController = async(req, res, next) => {
  const { rows } = await sqlQuery(selectAllRows())

  res.status(200).json(rows)
  next()
}

export default testTableSelectAllController
