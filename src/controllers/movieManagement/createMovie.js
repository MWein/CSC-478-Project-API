import {
  allUPCs as allUPCsQuery,
  createMovie,
} from '../../db/movieManagement'
import {
  copiesIsNotAnArrayErrorMessage,
  copiesIsNotArrayOfStringsErrorMessage,
  databaseErrorMessage,
  noError,
  noTitleProvidedErrorMessage,
  noUPCProvidedErrorMessage,
  upcAlreadyExistsErrorMessage,
} from '../../errorMessages'
import { sqlQuery } from '../../db'


const createMovieController = async(req, res, next) => {
  const upc = req.body.upc
  const title = req.body.title

  if (!upc) {
    return noUPCProvidedErrorMessage(res)
  } else if (!title) {
    return noTitleProvidedErrorMessage(res)
  }

  const allUPCsQ = await sqlQuery(allUPCsQuery())

  if (allUPCsQ.error) {
    return databaseErrorMessage(res)
  }
  const allUPCs = allUPCsQ.rows.map(movie => movie.upc)

  if (allUPCs.includes(upc)) {
    return upcAlreadyExistsErrorMessage(res)
  }

  const poster_loc = !req.body.poster_loc ? '' : req.body.poster_loc
  const copies = !req.body.copies ? [] : req.body.copies

  if (!Array.isArray(copies)) {
    return copiesIsNotAnArrayErrorMessage(res)
  }

  const typeCheck = copies.reduce((acc, copy) => typeof copy !== 'string' ? acc + 1 : acc, 0)

  if (typeCheck > 0) {
    return copiesIsNotArrayOfStringsErrorMessage(res)
  }


  const qResult = await sqlQuery(createMovie(upc, title, poster_loc, copies))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default createMovieController
