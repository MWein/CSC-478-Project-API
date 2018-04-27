import createMovieController from '../controllers/movieManagement/createMovie'
import editMovieController from '../controllers/movieManagement/editMovie'
import express from 'express'
import getMovieController from '../controllers/movieManagement/getMovie'
import getUser from '../middleware/getUser'
import imdbMovieSearchController from '../controllers/movieManagement/imdbMovieSearch'
import permit from '../middleware/permit'
import returnMovieController from '../controllers/movieManagement/returnMovie'

const router = express.Router() // eslint-disable-line new-cap

router.post('/imdbSearch', getUser, permit([ 'admin', 'manager', 'employee' ]), imdbMovieSearchController)
router.post('/createMovie', getUser, permit([ 'admin', 'manager', 'employee' ]), createMovieController)
router.post('/editMovie', getUser, permit([ 'admin', 'manager', 'employee' ]), editMovieController)
router.post('/getMovie', getUser, permit([ 'admin', 'manager', 'employee' ]), getMovieController)
router.post('/returnMovie', getUser, permit([ 'admin', 'manager', 'employee' ]), returnMovieController)

module.exports = router
