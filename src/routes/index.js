import express from 'express'
import smokeTest from '../controllers/smokeTest'

const router = express.Router()

router.get('/status', smokeTest)

module.exports = router
