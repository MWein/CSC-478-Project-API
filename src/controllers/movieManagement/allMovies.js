import { allMovies } from '../../db/movieManagement'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const getAllMoviesController = async(req, res, next) => {
  const upc = !req.body.upc ? '' : req.body.upc
  const title = !req.body.title ? '' : req.body.title

  const moviesQuery = await sqlQuery(allMovies())

  if (moviesQuery.error) {
    return databaseErrorMessage(res)
  }

  const moviesList = moviesQuery.rows

  const applyFilters = () => {
    const upcFilteredMovies = !upc ?
      moviesList :
      moviesList.filter(movie => movie.upc === upc)

    const titleFilteredMovies = !title ?
      upcFilteredMovies :
      upcFilteredMovies.filter(movie => movie.title === title)

    return titleFilteredMovies
  }
  const filteredMovies = applyFilters()

  const returnVal = {
    rowNum: filteredMovies.length,
    rows: filteredMovies,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllMoviesController
