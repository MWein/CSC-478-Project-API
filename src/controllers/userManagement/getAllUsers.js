import { allUsers } from '../../db/queries'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const getAllUsersController = async(req, res, next) => {
  const excludeInactive = req.body.excludeInactive === undefined ? false : req.body.excludeInactive

  const usersQuery = await sqlQuery(allUsers())

  if (usersQuery.error) {
    return databaseErrorMessage(res)
  }

  const applyExclusion = () => {
    if (excludeInactive) {
      return usersQuery.rows.filter(user => user.active)
    }

    return usersQuery.rows
  }
  const userList = applyExclusion()

  const rowsWithoutSensitiveInfo = userList.map(user => ({
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    role: user.role,
  }))

  const returnVal = {
    ...usersQuery,
    rows: rowsWithoutSensitiveInfo,
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllUsersController
