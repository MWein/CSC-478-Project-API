import bestCustomersController from '../controllers/transactionMangement/mostValuedCustomers'
import createTransactionController from '../controllers/transactionManagement/createTransaction'
import express from 'express'
import getUser from '../middleware/getUser'
import mostPopularMoviesController from '../controllers/transactionManagement/mostPopularMovies'
import openTransactionsController from '../controllers/transactionManagement/openTransactions'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/createTransaction', getUser, permit([ 'admin', 'manager', 'employee' ]), createTransactionController)
router.post('/openTransactions', getUser, permit([ 'admin', 'manager', 'employee' ]), openTransactionsController)
router.post('/bestMovies', getUser, permit([ 'admin', 'manager', 'employee' ]), mostPopularMoviesController)
router.post('/bestCustomers', getUser, permit([ 'admin', 'manager', 'employee' ]), bestCustomersController)

module.exports = router
