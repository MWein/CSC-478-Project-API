import {
  allMovies,
  getMovieCopiesUPC,
  getMovieRowTitle,
  getMovieRowUPC,
} from '../../db/movieManagement'
import _ from 'lodash'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'

const getAllMoviesController = async(req, res, next) => {
  const upc = req.body.upc
  const title = req.body.title
  const excludeInactive = req.body.excludeInactive === undefined ? true : req.body.excludeInactive

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


  const movieCopiesPromise = await moviesList.map(async movie => {
    const copiesQ = await sqlQuery(getMovieCopiesUPC(movie.upc))

    return copiesQ.rows
  })
  const movieCopies = await Promise.all(movieCopiesPromise)
  const flatMovieCopies = _.flatten(movieCopies)


  const moviesWithCopies = moviesList.map(movie => {
    const thisMoviesCopies = flatMovieCopies.filter(copy => copy.upc === movie.upc)
    const activeFilteredCopies = excludeInactive ? thisMoviesCopies.filter(copy => copy.active) : thisMoviesCopies
    const copyIds = activeFilteredCopies.map(copy => copy.id)

    return {
      ...movie,
      copies: copyIds,
    }
  })


  const returnVal = {
    numRows: moviesWithCopies.length,
    rows: moviesWithCopies,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllMoviesController
