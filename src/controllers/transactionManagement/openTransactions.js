import {
  openTransactions as openTransactionsQuery,
} from '../../db/transactionManagement'
import { sqlQuery } from '../../db'


const openTransactionsController = async(req, res, next) => {
  const openTransactions = await sqlQuery(openTransactionsQuery())

  res.status(200).json(openTransactions)
  next()
}

export default openTransactionsController
