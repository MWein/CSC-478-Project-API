import {
  databaseErrorMessage,
  movieNotFoundErrorMessage,
  noError,
  noUPCProvidedErrorMessage,
} from '../../errorMessages'
import {
  editMovie,
  getMovieRowUPC,
} from '../../db/movieManagement'
import { sqlQuery } from '../../db'


const editMovieController = async(req, res, next) => {
  const upc = req.body.upc

  if (!upc) {
    return noUPCProvidedErrorMessage(res)
  }

  const getMovieResult = await sqlQuery(getMovieRowUPC(upc))

  if (getMovieResult.error) {
    return databaseErrorMessage(res)
  }

  if (getMovieResult.rows.length === 0) {
    return movieNotFoundErrorMessage(res)
  }

  const movie = getMovieResult.rows[0]

  const title = !req.body.title ? movie.title : req.body.title
  const poster_loc = !req.body.poster_loc ? movie.poster_loc : req.body.poster_loc

  const editMovieResponse = await sqlQuery(editMovie(upc, title, poster_loc))

  if (editMovieResponse.error) {
    return databaseErrorMessage(res)
  }

  const response = {
    upc,
    title,
    poster_loc,
    ...noError(),
  }

  res.status(200).json(response)
  next()
}

export default editMovieController
