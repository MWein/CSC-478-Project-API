import createUserController from '../controllers/userManagement/createUser'
import express from 'express'
import getAllUsersController from '../controllers/userManagement/getAllUsers'
import getUser from '../middleware/getUser'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import permit from '../middleware/permit'
import setUserActiveController from '../controllers/userManagement/setUserActive'
import setUserRoleController from '../controllers/userManagement/setUserRole'
import smokeTest from '../controllers/smokeTest'

const router = express.Router() // eslint-disable-line new-cap

router.get('/status', smokeTest)

router.post('/login', loginController)
router.post('/logout', logoutController)

router.post('/allUsers', getUser, permit('admin'), getAllUsersController)
router.post('/createUser', getUser, permit('admin'), createUserController)
router.post('/setUserActive', getUser, permit('admin'), setUserActiveController)
router.post('/setUserRole', getUser, permit('admin'), setUserRoleController)

module.exports = router
