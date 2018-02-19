import createCustomerController from '../controllers/customerManagement/createCustomer'
import editCustomerController from '../controllers/customerManagement/editCustomer'
import express from 'express'
import getAllCustomersController from '../controllers/customerManagement/getAllCustomers'
import getUser from '../middleware/getUser'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/createCustomer', getUser, permit('admin', 'manager', 'employee'), createCustomerController)
router.post('/allCustomers', getUser, permit('admin', 'manager', 'employee'), getAllCustomersController)
router.post('/editCustomer', getUser, permit('admin', 'manager', 'employee'), editCustomerController)

module.exports = router
