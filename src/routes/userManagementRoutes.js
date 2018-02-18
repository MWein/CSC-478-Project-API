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
import signedInUsersController from '../controllers/userManagement/signedInUsers'
import sqLoginController from '../controllers/userManagement/sqLogin'

const router = express.Router() // eslint-disable-line new-cap

router.post('/allUsers', getUser, permit('admin'), getAllUsersController)
router.post('/signedInUsers', getUser, permit('admin'), signedInUsersController)

router.post('/createUser', getUser, permit('admin'), createUserController)

router.post('/setPassword', getUser, setPasswordController)
router.post('/securityQuestion', getSecurityQuestionController)
router.post('/answerSecQuestion', sqLoginController)

router.post('/setUserActive', getUser, permit('admin'), setUserActiveController)
router.post('/setUserRole', getUser, permit('admin'), setUserRoleController)
router.post('/secQuestion', getUser, setSecurityQuestionController)

module.exports = router
