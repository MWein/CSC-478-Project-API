import {
  copyIDNotProvidedErrorMessage,
  databaseErrorMessage,
} from '../../errorMessages'
import { allMovies } from '../../db/movieManagement'
import { sqlQuery } from '../../db'


const movieByCopyIdController = async(req, res, next) => {
  const copy = !req.body.copy ? '' : req.body.copy

  if (!copy) {
    return copyIDNotProvidedErrorMessage(res)
  }

  const moviesQuery = await sqlQuery(allMovies())

  if (moviesQuery.error) {
    return databaseErrorMessage(res)
  }

  const matches = moviesQuery.rows.filter(movie => movie.copies.includes(copy))

  res.status(200).json({
    movies: matches,
    error: false,
    errorMsg: '',
  })
  next()
}

export default movieByCopyIdController
