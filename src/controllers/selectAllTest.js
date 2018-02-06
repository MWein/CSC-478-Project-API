import { selectAllRows } from '../db/queries'
import { sqlQuery } from '../db'

const testTableSelectAllController = async(req, res, next) => {
  const result = await sqlQuery(selectAllRows())

  if (result.error) {
    res.status(500).send(result.errorMsg)
  } else {
    res.status(200).json(result.rows)
  }

  next()
}

export default testTableSelectAllController
