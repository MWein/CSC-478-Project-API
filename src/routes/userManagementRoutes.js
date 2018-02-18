import createUserController from '../controllers/userManagement/createUser'
import express from 'express'
import getAllUsersController from '../controllers/userManagement/getAllUsers'
import getSecurityQuestionController from '../controllers/userManagement/getSecurityQuestion'
import getUser from '../middleware/getUser'
import permit from '../middleware/permit'
import setPasswordController from '../controllers/userManagement/setPassword'
import setSecurityQuestionController from '../controllers/userManagement/setSecurityQuestion'
import setUserActiveController from '../controllers/userManagement/setUserActive'
import setUserRoleController from '../controllers/userManagement/setUserRole'

const router = express.Router() // eslint-disable-line new-cap

router.post('/allUsers', getUser, permit('admin'), getAllUsersController)

router.post('/createUser', getUser, permit('admin'), createUserController)

router.post('/setPassword', getUser, setPasswordController)
router.post('/getSecurityQuestion', getSecurityQuestionController)
router.post('/setSecurityQuestion', getUser, setSecurityQuestionController)

router.post('/setUserActive', getUser, permit('admin'), setUserActiveController)
router.post('/setUserRole', getUser, permit('admin'), setUserRoleController)

module.exports = router
