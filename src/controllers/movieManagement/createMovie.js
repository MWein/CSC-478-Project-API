import {
  copiesIsNotAnArrayErrorMessage,
  copiesIsNotArrayOfStringsErrorMessage,
  copyIDAlreadyExistsErrorMessage,
  databaseErrorMessage,
  noError,
  noTitleProvidedErrorMessage,
  noUPCProvidedErrorMessage,
} from '../../errorMessages'
import {
  countUPC,
  createMovie,
  createMovieCopy,
  getCopyRow,
} from '../../db/movieManagement'
import _ from 'lodash'
import { sqlQuery } from '../../db'


const createMovieController = async(req, res, next) => {
  const upc = req.body.upc
  const title = req.body.title

  if (!upc) {
    return noUPCProvidedErrorMessage(res)
  }

  const poster = !req.body.poster ? '' : req.body.poster
  const copies = !req.body.copies ? [] : req.body.copies

  if (!Array.isArray(copies)) {
    return copiesIsNotAnArrayErrorMessage(res)
  }

  if (copies.reduce((acc, copy) => typeof copy === 'string' ? acc : acc + 1, 0) > 0) {
    return copiesIsNotArrayOfStringsErrorMessage(res)
  }

  const checkUPCQ = await sqlQuery(countUPC(upc))

  if (checkUPCQ.error) {
    return databaseErrorMessage(res)
  }

  const uniqCopies = _.uniq(copies)

  const copyCheckPromises = uniqCopies.map(async copy => {
    const check = await sqlQuery(getCopyRow(copy))

    return check
  })
  const copyCheck = await Promise.all(copyCheckPromises)

  const copiesErrorCheck = copyCheck.reduce((acc, copyReturn) => {
    const newErrors = copyReturn.error ? acc.errors + 1 : acc.errors
    const newDuplicates = copyReturn.rows.length === 0 ? acc.duplicates : acc.duplicates + 1

    return { errors: newErrors, duplicates: newDuplicates }
  }, { errors: 0, duplicates: 0 })

  if (copiesErrorCheck.errors > 0) {
    return databaseErrorMessage(res)
  } else if (copiesErrorCheck.duplicates > 0) {
    return copyIDAlreadyExistsErrorMessage(res)
  }


  if (checkUPCQ.rows[0].count === 0) {
    if (!title) {
      return noTitleProvidedErrorMessage(res)
    }

    const qResult = await sqlQuery(createMovie(upc, title, poster))

    if (qResult.error) {
      return databaseErrorMessage(res)
    }
  }

  const movieCopyQPromises = await uniqCopies.map(async copy => {
    const thisQ = await sqlQuery(createMovieCopy(copy, upc, true))

    return thisQ
  })
  const movieCopyQResults = await Promise.all(movieCopyQPromises)

  if (movieCopyQResults.reduce((acc, result) => result.error ? acc + 1 : acc, 0) > 0) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default createMovieController
