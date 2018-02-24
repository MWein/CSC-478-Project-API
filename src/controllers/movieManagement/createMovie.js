import {
  allUPCAndCopyIds as allUPCAndCopyIdsQuery,
  createMovie,
  createMovieCopy,
} from '../../db/movieManagement'
import {
  copiesIsNotAnArrayErrorMessage,
  copiesIsNotArrayOfStringsErrorMessage,
  copyIDAlreadyExistsErrorMessage,
  databaseErrorMessage,
  noError,
  noTitleProvidedErrorMessage,
  noUPCProvidedErrorMessage,
  upcAlreadyExistsErrorMessage,
} from '../../errorMessages'
import _ from 'lodash'
import { sqlQuery } from '../../db'


const createMovieController = async(req, res, next) => {
  const upc = req.body.upc
  const title = req.body.title

  if (!upc) {
    return noUPCProvidedErrorMessage(res)
  } else if (!title) {
    return noTitleProvidedErrorMessage(res)
  }

  const poster = !req.body.poster ? '' : req.body.poster
  const copies = !req.body.copies ? [] : req.body.copies

  if (!Array.isArray(copies)) {
    return copiesIsNotAnArrayErrorMessage(res)
  }

  if (copies.reduce((acc, copy) => typeof copy === 'string' ? acc : acc + 1, 0) > 0) {
    return copiesIsNotArrayOfStringsErrorMessage(res)
  }

  const allUPCAndCopyIDsQ = await sqlQuery(allUPCAndCopyIdsQuery())

  if (allUPCAndCopyIDsQ.error) {
    return databaseErrorMessage(res)
  }
  const allUPCs = allUPCAndCopyIDsQ.rows.map(copy => copy.upc)
  const allCopyIDs = allUPCAndCopyIDsQ.rows.map(copy => copy.id)

  if (allUPCs.includes(upc)) {
    return upcAlreadyExistsErrorMessage(res)
  }

  const uniqCopies = _.uniq(copies)

  const duplicateIDs = uniqCopies.reduce((acc, id) => allCopyIDs.includes(id) ? acc + 1 : acc, 0)

  if (duplicateIDs > 0) {
    return copyIDAlreadyExistsErrorMessage(res)
  }

  const qResult = await sqlQuery(createMovie(upc, title, poster))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  const movieCopyQPromises = await uniqCopies.map(async copy => {
    const thisQ = await sqlQuery(createMovieCopy(copy, upc, true))

    return thisQ
  })
  const movieCopyQResults = await Promise.all(movieCopyQPromises)
  const movieCopyDatabaseErrors = movieCopyQResults.reduce((acc, result) => result.error ? acc + 1 : acc, 0)

  if (movieCopyDatabaseErrors > 0) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default createMovieController
