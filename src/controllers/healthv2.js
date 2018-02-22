import {
  checkCustomersTable,
  checkMoviesTable,
  checkUsersTable,
  createCustomersTable,
  createMoviesTable,
  createUsersTable,
} from '../db/createTables'
import { createUser } from '../db/userManagement'
import { sqlQuery } from '../db'

const healthController = async(req, res, next) => {
  const checkForUsersTable = async() => {
    const usersCheck = await sqlQuery(checkUsersTable())

    if (usersCheck.error && usersCheck.errorMsg === 'relation "users" does not exist') {
      const usersTableCreation = await sqlQuery(createUsersTable())

      if (usersTableCreation.error) {
        return { error: true, errorMsg: 'Could not create users table' }
      }
    } else if (usersCheck.error) {
      return { error: true, errorMsg: 'Could not reach users table' }
    }

    return { error: false, errorMsg: '' }
  }
  const usersCheck = await checkForUsersTable()

  await sqlQuery(createUser('superuser', '', '', 'password', 'admin', true))


  const checkForCustomersTable = async() => {
    const customersCheck = await sqlQuery(checkCustomersTable())

    if (customersCheck.error && customersCheck.errorMsg === 'relation "customers" does not exist') {
      const customersTableCreation = await sqlQuery(createCustomersTable())

      if (customersTableCreation.error) {
        return { error: true, errorMsg: 'Could not create customers table' }
      }
    } else if (customersCheck.error) {
      return { error: true, errorMsg: 'Could not reach customers table' }
    }

    return { error: false, errorMsg: '' }
  }
  const customersCheck = await checkForCustomersTable()


  const checkForMoviesTable = async() => {
    const moviesCheck = await sqlQuery(checkMoviesTable())

    if (moviesCheck.error && moviesCheck.errorMsg === 'relation "movies" does not exist') {
      const moviesTableCreation = await sqlQuery(createMoviesTable())

      if (moviesTableCreation.error) {
        return { error: true, errorMsg: 'Could not create movies table' }
      }
    } else if (moviesCheck.error) {
      return { error: true, errorMsg: 'Could not reach movies table' }
    }

    return { error: false, errorMsg: '' }
  }
  const moviesCheck = await checkForMoviesTable()


  // TODO Check connection to IMDB


  const returnVal = {
    usersDatabase: usersCheck,
    customersDatabase: customersCheck,
    moviesDatabase: moviesCheck,
  }


  const checkStatus = Object.values(returnVal).reduce((acc, object) => {
    if (object.error) {
      return acc + 1
    }

    return acc
  }, 0)
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
