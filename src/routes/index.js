import deleteUserController from '../controllers/deleteUser'
import express from 'express'
import getAllUsersController from '../controllers/getAllUsers'
import getUser from '../middleware/getUser'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import permit from '../middleware/permit'
import smokeTest from '../controllers/smokeTest'

const router = express.Router() // eslint-disable-line new-cap

router.get('/status', smokeTest)

router.get('/allUsers', getUser, permit('admit'), getAllUsersController)
router.post('/login', loginController)
router.post('/logout', logoutController)

// router.post('/createUser', getUser, permit('admin'), createUserController)
// router.post('/editUser', getUser, permit('admin'), editUserController)
router.post('/deleteUser', getUser, permit('admin'), deleteUserController)

module.exports = router
