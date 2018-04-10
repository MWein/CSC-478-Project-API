import customerManagementRoutes from './customerManagementRoutes'
import express from 'express'
import getUser from '../middleware/getUser'
import healthController from '../controllers/health'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import movieManagementRoutes from './movieManagementRoutes'
import transactionManagementRoutes from './transactionManagementRoutes'
import userManagementRoutes from './userManagementRoutes'

const router = express.Router() // eslint-disable-line new-cap

router.get('/status', healthController)
router.post('/login', loginController)
router.post('/logout', getUser, logoutController)

router.use('/', userManagementRoutes)
router.use('/', customerManagementRoutes)
router.use('/', movieManagementRoutes)
router.use('/', transactionManagementRoutes)

module.exports = router
