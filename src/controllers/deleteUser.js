import {
  deleteUser,
  getUserRow,
} from '../db/queries'
import { sqlQuery } from '../db'


const deleteUserController = async(req, res, next) => {
  const doomedId = req.body.doomedId

  if (doomedId === undefined) {
    return res.status(500).json({ error: true, errorMsg: 'No ID provided' })
  }

  const getUserResult = await sqlQuery(getUserRow(doomedId))

  if (getUserResult.error) {
    return res.status(500).json({ error: true, errorMsg: 'Internal server error' })
  }

  if (getUserResult.rows.length === 0) {
    return res.status(500).json({ error: true, errorMsg: 'User not found' })
  }

  const deleteResult = await sqlQuery(deleteUser(doomedId))

  if (deleteResult.error) {
    return res.status(500).json({ error: true, errorMsg: 'Database error' })
  }

  res.status(200).send('success')
  next()
}

export default deleteUserController
