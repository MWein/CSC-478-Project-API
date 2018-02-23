import allMoviesController from '../controllers/movieManagement/allMovies'
import createMovieController from '../controllers/movieManagement/createMovie'
import editMovieController from '../controllers/movieManagement/editMovie'
import express from 'express'
import getUser from '../middleware/getUser'
import imdbMovieSearchController from '../controllers/movieManagement/imdbMovieSearch'
import movieByCopyIdController from '../controllers/movieManagement/movieByCopyId'
import permit from '../middleware/permit'

const router = express.Router() // eslint-disable-line new-cap

router.post('/imdbSearch', getUser, permit('admin', 'manager', 'employee'), imdbMovieSearchController)
router.post('/createMovie', getUser, permit('admin', 'manager', 'employee'), createMovieController)
router.post('/editMovie', getUser, permit('admin', 'manager', 'employee'), editMovieController)
router.post('/allMovies', getUser, permit('admin', 'manager', 'employee'), allMoviesController)
router.post('/lookupCopyId', getUser, permit('admin', 'manager', 'employee'), movieByCopyIdController)

module.exports = router
