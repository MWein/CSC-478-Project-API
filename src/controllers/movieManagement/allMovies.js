import {
  allMovies,
  getMovieRowTitle,
  getMovieRowUPC,
} from '../../db/movieManagement'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const getAllMoviesController = async(req, res, next) => {
  // const upc = !req.body.upc ? '' : req.body.upc
  // const title = !req.body.title ? '' : req.body.title

  const upc = req.body.upc
  const title = req.body.title

  const decideMoviesQuery = () => {
    if (!upc && !title) {
      return allMovies()
    } else if (upc) {
      return getMovieRowUPC(upc)
    }

    return getMovieRowTitle(title)
  }
  const moviesQuery = await sqlQuery(decideMoviesQuery())

  if (moviesQuery.error) {
    return databaseErrorMessage(res)
  }

  const moviesList = moviesQuery.rows

  const returnVal = {
    rowNum: moviesList.length,
    rows: moviesList,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllMoviesController
