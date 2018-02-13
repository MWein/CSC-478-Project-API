import { allUsers as allUsersQuery, updateTokenAndTimestampForUser } from '../db/queries'
import { sqlQuery } from '../db'


const sendUserNotFound = res => {
  res.status(500).json({ error: true, errorMsg: 'User not found' })
}

const logoutController = async(req, res, next) => {
  const id = req.body.id

  if (id === undefined) {
    sendUserNotFound(res)

    return false
  }

  const queryData = await sqlQuery(allUsersQuery())
  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    sendUserNotFound(res)

    return false
  }

  await sqlQuery(updateTokenAndTimestampForUser(id, '', ''))

  res.status(200).send('Logout successful')
  next()
}

export default logoutController
