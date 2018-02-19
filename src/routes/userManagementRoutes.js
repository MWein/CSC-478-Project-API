import createUserController from '../controllers/userManagement/createUser'
import editUserController from '../controllers/userManagement/editUser'
import express from 'express'
import getAllUsersController from '../controllers/userManagement/getAllUsers'
import getSecurityQuestionController from '../controllers/userManagement/getSecurityQuestion'
import getUser from '../middleware/getUser'
import permit from '../middleware/permit'
import setPasswordController from '../controllers/userManagement/setPassword'
import setSecurityQuestionController from '../controllers/userManagement/setSecurityQuestion'
import superuserResetPassword from '../controllers/userManagement/superuserResetPassword'

const router = express.Router() // eslint-disable-line new-cap

router.post('/allUsers', getUser, permit('admin', 'manager'), getAllUsersController)

router.post('/createUser', getUser, permit('admin', 'manager'), createUserController)
router.post('/editUser', getUser, permit('admin', 'manager'), editUserController)

router.post('/adminSetPassword', getUser, permit('admin'), superuserResetPassword)

router.post('/setPassword', getUser, setPasswordController)
router.post('/getSecurityQuestion', getSecurityQuestionController)
router.post('/setSecurityQuestion', getUser, setSecurityQuestionController)

module.exports = router
