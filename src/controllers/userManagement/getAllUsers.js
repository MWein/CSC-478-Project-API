import { allUsers } from '../../db/userManagement'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const getAllUsersController = async(req, res, next) => {
  const excludeInactive = !req.body.excludeInactive ? false : req.body.excludeInactive
  const signedInOnly = !req.body.signedIn ? false : req.body.signedIn

  const usersQuery = await sqlQuery(allUsers())

  if (usersQuery.error) {
    return databaseErrorMessage(res)
  }

  const applyExclusion = () => {
    if (signedInOnly === 'true' || signedInOnly === true) {
      return usersQuery.rows.filter(user =>
        user.active &&
        new Date() - new Date(user.timestamp) < 900000 &&
        user.token !== '')
    } else if (excludeInactive === 'true' || excludeInactive === true) {
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
    active: user.active,
    phone: user.phone,
    address: user.address,
    timestamp: user.timestamp,
  }))

  const returnVal = {
    ...usersQuery,
    rows: rowsWithoutSensitiveInfo,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllUsersController
