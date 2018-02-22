import createMovieController from '../controllers/movieManagement/createMovie'
import express from 'express'
import getUser from '../middleware/getUser'
import imdbMovieSearchController from '../controllers/movieManagement/imdbMovieSearch'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/imdbSearch', getUser, permit('admin', 'manager', 'employee'), imdbMovieSearchController)
router.post('/createMovie', getUser, permit('admin', 'manager', 'employee'), createMovieController)

module.exports = router
