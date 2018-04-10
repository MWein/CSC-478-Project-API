import {
  createTransaction,
} from '../../db/transactionManagement'
import {
  noError,
} from '../../errorMessages'
import { sqlQuery } from '../../db'


const createTransactionController = async(req, res, next) => {
  const customerID = req.body.customerID
  const copyIDs = req.body.copyIDs
  const dueDate = new Date()

  dueDate.setDate(dueDate.getDate() + 1)

  copyIDs.map(copyID => {
    sqlQuery(createTransaction(customerID, copyID, dueDate, false))
  })

  res.status(200).json(noError())
  next()
}

export default createTransactionController
