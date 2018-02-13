import express from 'express'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import smokeTest from '../controllers/smokeTest'
import testTableSelectAllController from '../controllers/selectAllTest'

const router = express.Router()

router.get('/status', smokeTest)
router.get('/ttAll', testTableSelectAllController)

router.post('/login', loginController)
router.post('/logout', logoutController)

module.exports = router
