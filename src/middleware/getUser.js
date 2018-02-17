import {
  allUsers as allUsersQuery,
  updateTimestampForUser,
} from '../db/userManagementQueries'
import {
  databaseErrorMessage,
  invalidCredentialsErrorMessage,
  noTokenProvidedErrorMessage,
  timeoutErrorMessage,
} from '../errorMessages'
import { sqlQuery } from '../db'


const getUser = async(req, res, next) => {
  const token = req.body.token

  if (!token) {
    return noTokenProvidedErrorMessage(res)
  }

  const allUsersQData = await sqlQuery(allUsersQuery())

  if (allUsersQData.error) {
    return databaseErrorMessage(res)
  }

  const allUsers = allUsersQData.rows

  const matchingUsers = allUsers.filter(user => user.token === token)

  if (matchingUsers.length === 0) {
    return invalidCredentialsErrorMessage(res)
  }

  const user = matchingUsers[0]
  const timestamp = user.timestamp

  if (timestamp === '') {
    return timeoutErrorMessage(res)
  }

  const rightNow = new Date()

  const timeSinceLastAction = rightNow - new Date(timestamp)

  if (timeSinceLastAction > 900000) {
    await sqlQuery(updateTimestampForUser(user.id, ''))

    return timeoutErrorMessage(res)
  }

  await sqlQuery(updateTimestampForUser(user.id, rightNow))

  res.locals.user = user
  next()
}

export default getUser
