import {
  allUsers as allUsersQuery,
  updateTimestampForUser,
} from '../db/queries'
import { sqlQuery } from '../db'


const getUser = async(req, res, next) => {
  const token = req.body.token

  if (token === undefined) {
    return res.status(400).json({ error: true, errorMsg: 'No token provided' })
  }

  const allUsersQData = await sqlQuery(allUsersQuery())
  const allUsers = allUsersQData.rows

  const matchingUsers = allUsers.filter(user => user.token === token)

  if (matchingUsers.length === 0) {
    return res.status(400).json({ error: true, errorMsg: 'User not found' })
  }

  const user = matchingUsers[0]
  const timestamp = user.timestamp

  if (timestamp === '') {
    return res.status(400).json({ error: true, errorMsg: 'Session timeout' })
  }

  const rightNow = new Date()

  const timeSinceLastAction = rightNow - new Date(timestamp)

  if (timeSinceLastAction > 900000) {
    await sqlQuery(updateTimestampForUser(user.id, ''))

    return res.status(400).json({ error: true, errorMsg: 'Session timeout' })
  }

  await sqlQuery(updateTimestampForUser(user.id, rightNow))

  res.locals.user = user
  next()
}

export default getUser
