import customerManagementRoutes from './customerManagementRoutes'
import express from 'express'
import getUser from '../middleware/getUser'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import movieManagementRoutes from './movieManagementRoutes'
import smokeTest from '../controllers/smokeTest'
import userManagementRoutes from './userManagementRoutes'

const router = express.Router() // eslint-disable-line new-cap

router.get('/status', smokeTest)
router.post('/login', loginController)
router.post('/logout', getUser, logoutController)

router.use('/', userManagementRoutes)
router.use('/', customerManagementRoutes)
router.use('/', movieManagementRoutes)

module.exports = router
