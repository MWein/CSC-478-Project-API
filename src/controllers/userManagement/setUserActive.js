import {
  databaseErrorMessage,
  forbiddenErrorMessage,
  noIdProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import {
  getUserRow,
  setUserActive,
} from '../../db/queries'
import { sqlQuery } from '../../db'


const setUserActiveController = async(req, res, next) => {
  const id = req.body.id
  const active = req.body.active === undefined ? true : req.body.active

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (id === 'superuser' && active === false) {
    return forbiddenErrorMessage(res)
  }

  const getUserResult = await sqlQuery(getUserRow(id))

  if (getUserResult.error) {
    return databaseErrorMessage(res)
  }

  if (getUserResult.rows.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  await sqlQuery(setUserActive(id, active))

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default setUserActiveController
