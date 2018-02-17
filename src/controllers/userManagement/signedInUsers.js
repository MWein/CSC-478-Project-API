import { allUsers } from '../../db/userManagement'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const signedInUsersController = async(req, res, next) => {
  const usersQuery = await sqlQuery(allUsers())

  if (usersQuery.error) {
    return databaseErrorMessage(res)
  }

  const signedInUsers = usersQuery.rows.filter(user =>
    user.active &&
    new Date() - new Date(user.timestamp) < 900000 &&
    user.token !== '')

  const rowsWithoutSensitiveInfo = signedInUsers.map(user => ({
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    role: user.role,
    timestamp: new Date(user.timestamp).toString(),
  }))

  const returnVal = {
    ...usersQuery,
    rows: rowsWithoutSensitiveInfo,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default signedInUsersController
