import createTransactionController from '../controllers/transactionManagement/createTransaction'
import express from 'express'
import getUser from '../middleware/getUser'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/createTransaction', getUser, permit([ 'admin', 'manager', 'employee' ]), createTransactionController)

module.exports = router
