import {
  allUsers,
} from '../db/queries'
import { sqlQuery } from '../db'


const getAllUsersController = async(req, res, next) => {
  const usersQuery = await sqlQuery(allUsers())

  if (usersQuery.error) {
    return res.status(500).json({ error: true, errorMsg: 'Internal server error' })
  }

  const rowsWithoutSensitiveInfo = usersQuery.rows.map(user => ({
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    role: user.role,
  }))

  const returnVal = {
    ...usersQuery,
    rows: rowsWithoutSensitiveInfo,
  }

  res.status(200).send(returnVal)
  next()
}

export default getAllUsersController
