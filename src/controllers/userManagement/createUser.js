import {
  allUsers as allUsersQuery,
  createUser,
} from '../../db/userManagement'
import {
  databaseErrorMessage,
  idAlreadyExistsErrorMessage,
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

  const newFName = !req.body.fName ? '' : req.body.fName
  const newLName = !req.body.lName ? '' : req.body.lName

  const allUsersQ = await sqlQuery(allUsersQuery())

  if (allUsersQ.error) {
    return databaseErrorMessage(res)
  }

  const allUserIDs = allUsersQ.rows.map(user => user.id)

  if (allUserIDs.includes(newId)) {
    return idAlreadyExistsErrorMessage(res)
  }

  const qResult = await sqlQuery(createUser(newId, newFName, newLName, newPin, newRole, true))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default createUserController
