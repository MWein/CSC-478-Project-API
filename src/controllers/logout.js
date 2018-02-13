import { allUsers as allUsersQuery, updateTokenAndTimestampForUser } from '../db/queries'
import { sqlQuery } from '../db'


const sendUserNotFound = res => {
  res.status(500).json({ error: true, errorMsg: 'User not found' })
}

const logoutController = async(req, res, next) => {
  const id = req.body.id

  if (id === undefined) {
    return sendUserNotFound(res)
  }

  const queryData = await sqlQuery(allUsersQuery())
  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return sendUserNotFound(res)
  }

  await sqlQuery(updateTokenAndTimestampForUser(id, '', ''))

  res.status(200).send('success')
  next()
}

export default logoutController
