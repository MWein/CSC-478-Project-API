import {
  databaseErrorMessage,
  noError,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import {
  getUserRow,
  setUserPin,
} from '../../db/userManagement'
import { sqlQuery } from '../../db'


const superuserResetPassword = async(req, res, next) => {
  const id = req.body.id
  const newPassword = req.body.pin

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (!newPassword) {
    return noPinProvidedErrorMessage(res)
  }

  const getUserResult = await sqlQuery(getUserRow(id))

  if (getUserResult.error) {
    return databaseErrorMessage(res)
  }

  if (getUserResult.rows.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  const setUserPinResponse = await sqlQuery(setUserPin(id, newPassword))

  if (setUserPinResponse.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default superuserResetPassword
