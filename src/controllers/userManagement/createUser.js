import {
  createUser,
  allUserIDs as userIDsQuery,
} from '../../db/userManagement'
import {
  databaseErrorMessage,
  idAlreadyExistsErrorMessage,
  noError,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  noRoleProvidedErrorMessage,
} from '../../errorMessages'
import { sqlQuery } from '../../db'


const createUserController = async(req, res, next) => {
  const newId = req.body.id
  const newPin = req.body.pin
  const newRole = req.body.role

  if (!newId) {
    return noIdProvidedErrorMessage(res)
  } else if (!newPin) {
    return noPinProvidedErrorMessage(res)
  } else if (!newRole) {
    return noRoleProvidedErrorMessage(res)
  }

  const newFName = !req.body.f_name ? '' : req.body.f_name
  const newLName = !req.body.l_name ? '' : req.body.l_name
  const newphone = !req.body.phone ? '' : req.body.phone
  const newAddress = !req.body.address ? '' : req.body.address

  const allUserIDsQ = await sqlQuery(userIDsQuery())

  if (allUserIDsQ.error) {
    return databaseErrorMessage(res)
  }

  const allUserIDs = allUserIDsQ.rows.map(user => user.id)

  if (allUserIDs.includes(newId)) {
    return idAlreadyExistsErrorMessage(res)
  }

  const qResult = await sqlQuery(createUser(newId, newFName, newLName, newPin, newRole, true, newphone, newAddress))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json(noError())
  next()
}

export default createUserController
