import {
  databaseErrorMessage,
  noError,
} from '../../errorMessages'
import {
  createTransaction,
} from '../../db/transactionManagement'
import { sqlQuery } from '../../db'


const createTransactionController = async(req, res, next) => {
  const customerID = req.body.customerID
  const copyID = req.body.copyID

  const dueDate = new Date()

  dueDate.setDate(dueDate.getDate() + 1)

  const qResult = await sqlQuery(createTransaction(customerID, copyID, dueDate, false))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default createTransactionController
