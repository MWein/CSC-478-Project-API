import { sqlQuery } from '../db'
import { updateTokenAndTimestampForUser } from '../db/queries'


const logoutController = async(req, res, next) => {
  const id = req.body.id

  if (id === undefined) {
    res.status(500).json({ error: true, errorMsg: 'User not found' })

    return false
  }

  await sqlQuery(updateTokenAndTimestampForUser(id, '', ''))

  res.status(200).send('Logout successful')
  next()
}

export default logoutController
