import {
  bestCustomers,
} from '../../db/transactionManagement'
import { sqlQuery } from '../../db'


const bestCustomersController = async(req, res, next) => {
  const limit = !req.body.limit ? 10 : req.body.limit
  const results = await sqlQuery(bestCustomers(limit))

  res.status(200).json(results.rows)
  next()
}

export default bestCustomersController
