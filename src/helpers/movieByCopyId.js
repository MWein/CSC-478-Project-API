import {
  getCopyRow,
  getMovieRowUPC,
} from '../db/movieManagement'
import { sqlQuery } from '../db'


const movieBycopyId = async copyId => {
  if (!copyId) {
    return { error: true, errorMsg: 'Copy ID not provided' }
  }

  const copyRowQ = await sqlQuery(getCopyRow(copyId))

  if (copyRowQ.error) {
    return { error: true, errorMsg: 'Database error' }
  } else if (copyRowQ.rows.length === 0) {
    return { error: true, errorMsg: 'Copy ID does not exist' }
  }

  const upc = copyRowQ.rows[0].upc
  const movieRowQ = await sqlQuery(getMovieRowUPC(upc))

  if (movieRowQ.error) {
    return { error: true, errorMsg: 'Database error' }
  } else if (movieRowQ.rows.length === 0) {
    return { error: true, errorMsg: 'UPC does not exist' }
  }

  return {
    copyId,
    ...movieRowQ.rows[0],
    error: false,
    errorMsg: '',
  }
}

export default movieBycopyId
