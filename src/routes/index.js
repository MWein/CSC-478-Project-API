import customerManagementRoutes from './customerManagementRoutes'
import express from 'express'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import smokeTest from '../controllers/smokeTest'
import userManagementRoutes from './userManagementRoutes'

const router = express.Router() // eslint-disable-line new-cap

router.get('/status', smokeTest)
router.post('/login', loginController)
router.post('/logout', logoutController)

router.use('/', userManagementRoutes)
router.use('/', customerManagementRoutes)

module.exports = router
