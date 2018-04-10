import createTransactionController from '../controllers/transactionManagement/createTransaction'
import express from 'express'
import getUser from '../middleware/getUser'
import openTransactionsController from '../controllers/transactionManagement/openTransactionsController'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/createTransaction', getUser, permit([ 'admin', 'manager', 'employee' ]), createTransactionController)
router.post('/openTransactions', getUser, permit([ 'admin', 'manager', 'employee' ]), openTransactionsController)

module.exports = router
