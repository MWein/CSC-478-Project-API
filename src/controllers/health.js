import {
  checkCustomersTable,
  checkMovieCopiesTable,
  checkMoviesTable,
  checkUsersTable,
  createCustomersTable,
  createMovieCopiesTable,
  createMoviesTable,
  createUsersTable,
} from '../db/createTables'
import { createUser } from '../db/userManagement'
import { sqlQuery } from '../db'


const tableCheckReturn = async(check, tableName, createTableQuery) => {
  if (check.error && check.errorMsg.includes('does not exist')) {
    const usersTableCreation = await sqlQuery(createTableQuery)

    if (usersTableCreation.error) {
      return { error: true, errorMsg: `Could not create ${tableName} table` }
    }
  } else if (check.error) {
    return { error: true, errorMsg: `Could not reach ${tableName} table` }
  }

  return { error: false, errorMsg: '' }
}


export const checkForUsersTable = async() => {
  const usersCheck = await sqlQuery(checkUsersTable())
  const returnVal = await tableCheckReturn(usersCheck, 'users', createUsersTable())

  return returnVal
}


export const checkForCustomersTable = async() => {
  const customersCheck = await sqlQuery(checkCustomersTable())
  const returnVal = await tableCheckReturn(customersCheck, 'customers', createCustomersTable())

  return returnVal
}


export const checkForMoviesTable = async() => {
  const moviesCheck = await sqlQuery(checkMoviesTable())
  const returnVal = await tableCheckReturn(moviesCheck, 'movies', createMoviesTable())

  return returnVal
}


export const checkForMovieCopiesTable = async() => {
  const moviesCheck = await sqlQuery(checkMovieCopiesTable())
  const returnVal = await tableCheckReturn(moviesCheck, 'movie copies', createMovieCopiesTable())

  return returnVal
}


const healthController = async(req, res, next) => {
  const usersStatus = await checkForUsersTable()
  const customersStatus = await checkForCustomersTable()
  const moviesStatus = await checkForMoviesTable()
  const movieCopyStatus = await checkForMovieCopiesTable()

  await sqlQuery(createUser('superuser', '', '', 'password', 'admin', true))


  // TODO Check connection to IMDB


  const returnVal = {
    usersDatabase: usersStatus,
    customersDatabase: customersStatus,
    moviesDatabase: moviesStatus,
    movieCopiesDatabase: movieCopyStatus,
  }


  const checkStatus = Object.values(returnVal).reduce((acc, object) => object.error ? acc + 1 : acc, 0)
  const status = checkStatus === 0 ? 200 : 500
  const error = checkStatus !== 0

  const finalReturnVal = {
    ...returnVal,
    error,
  }

  res.status(status).json(finalReturnVal)
  next()
}

export default healthController
