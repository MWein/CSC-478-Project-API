import { allUsers } from '../db/queries'
import { databaseErrorMessage } from '../errorMessages'
import { sqlQuery } from '../db'


const getAllUsersController = async(req, res, next) => {
  const usersQuery = await sqlQuery(allUsers())

  if (usersQuery.error) {
    return databaseErrorMessage(res)
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
