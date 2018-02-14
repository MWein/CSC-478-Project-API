import express from 'express'
import loginController from '../controllers/login'
import logoutController from '../controllers/logout'
import smokeTest from '../controllers/smokeTest'

const router = express.Router()

router.get('/status', smokeTest)

router.post('/login', loginController)
router.post('/logout', logoutController)

module.exports = router
