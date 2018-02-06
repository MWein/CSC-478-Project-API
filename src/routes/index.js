import express from 'express'
import smokeTest from '../controllers/smokeTest'
import testTableSelectAllController from '../controllers/selectAllTest'

const router = express.Router()

router.get('/status', smokeTest)
router.get('/ttAll', testTableSelectAllController)

module.exports = router
