import {
  copiesIsNotAnArrayErrorMessage,
  copiesIsNotArrayOfStringsErrorMessage,
  databaseErrorMessage,
  movieNotFoundErrorMessage,
  noError,
  noUPCProvidedErrorMessage,
} from '../../errorMessages'
import {
  editMovie,
  getMovieRow,
} from '../../db/movieManagement'
import { sqlQuery } from '../../db'


const editMovieController = async(req, res, next) => {
  const upc = req.body.upc

  if (!upc) {
    return noUPCProvidedErrorMessage(res)
  }

  const getMovieResult = await sqlQuery(getMovieRow(upc))

  if (getMovieResult.error) {
    return databaseErrorMessage(res)
  }

  if (getMovieResult.rows.length === 0) {
    return movieNotFoundErrorMessage(res)
  }

  const movie = getMovieResult.rows[0]

  const title = !req.body.title ? movie.title : req.body.title
  const poster = !req.body.poster ? movie.poster : req.body.poster
  const copies = !req.body.copies ? movie.copies : req.body.copies

  if (!Array.isArray(copies)) {
    return copiesIsNotAnArrayErrorMessage(res)
  }

  const typeCheck = copies.reduce((acc, copy) => typeof copy !== 'string' ? acc + 1 : acc, 0)

  if (typeCheck > 0) {
    return copiesIsNotArrayOfStringsErrorMessage(res)
  }

  const editMovieResponse = await sqlQuery(editMovie(upc, title, poster, copies))

  if (editMovieResponse.error) {
    return databaseErrorMessage(res)
  }

  const response = {
    upc,
    title,
    poster,
    copies,
    ...noError(),
  }

  res.status(200).json(response)
  next()
}

export default editMovieController
