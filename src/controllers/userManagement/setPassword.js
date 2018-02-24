import {
  databaseErrorMessage,
  noError,
  noPinProvidedErrorMessage,
} from '../../errorMessages'
import { setUserPin } from '../../db/userManagement'
import { sqlQuery } from '../../db'


const setPasswordController = async(req, res, next) => {
  const id = res.locals.user.id
  const newPass = req.body.pin

  if (!newPass) {
    return noPinProvidedErrorMessage(res)
  }

  const result = await sqlQuery(setUserPin(id, newPass))

  if (result.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default setPasswordController
