import { allUsers as allUsersQuery, updateTokenAndTimestampForUser } from '../db/queries'
import {
  databaseErrorMessage,
  userNotFoundMessage,
} from '../errorMessages'
import { sqlQuery } from '../db'


const logoutController = async(req, res, next) => {
  const id = req.body.id

  if (id === undefined) {
    return userNotFoundMessage(res)
  }

  const queryData = await sqlQuery(allUsersQuery())

  if (queryData.error) {
    return databaseErrorMessage(res)
  }

  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return userNotFoundMessage(res)
  }

  await sqlQuery(updateTokenAndTimestampForUser(id, '', ''))

  res.status(200).send('success')
  next()
}

export default logoutController
