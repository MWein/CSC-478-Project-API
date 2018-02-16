import {
  databaseErrorMessage,
  forbiddenErrorMessage,
  noIdProvidedErrorMessage,
  noRoleProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import {
  getUserRow,
  setUserRole,
} from '../../db/queries'
import { sqlQuery } from '../../db'


const setUserRoleController = async(req, res, next) => {
  const id = req.body.id
  const role = req.body.role

  if (id === undefined) {
    return noIdProvidedErrorMessage(res)
  } else if (role === undefined) {
    return noRoleProvidedErrorMessage(res)
  } else if (id === 'superuser') {
    return forbiddenErrorMessage(res)
  }

  const getUserResult = await sqlQuery(getUserRow(id))

  if (getUserResult.error) {
    return databaseErrorMessage(res)
  }

  if (getUserResult.rows.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  await sqlQuery(setUserRole(id, role))

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default setUserRoleController
