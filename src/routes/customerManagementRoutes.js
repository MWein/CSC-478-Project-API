import express from 'express'
import getAllCustomersController from '../controllers/customerManagement/getAllCustomers'
import getUser from '../middleware/getUser'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/allCustomers', getUser, permit('employee', 'admin'), getAllCustomersController)

module.exports = router
