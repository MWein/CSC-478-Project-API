import {
  allUsers as allUsersQuery,
  createUser,
} from '../../db/queries'
import {
  databaseErrorMessage,
  idAlreadyExistsErrorMessage,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  noRoleProvidedErrorMessage,
} from '../../errorMessages'
import { sqlQuery } from '../../db'


const createUserController = async(req, res, next) => {
  const newId = req.body.newId
  const newPin = req.body.newPin
  const newRole = req.body.newRole

  if (newId === undefined) {
    return noIdProvidedErrorMessage(res)
  } else if (newPin === undefined) {
    return noPinProvidedErrorMessage(res)
  } else if (newRole === undefined) {
    return noRoleProvidedErrorMessage(res)
  }

  const newFName = req.body.newFName === undefined ? '' : req.body.newFName
  const newLName = req.body.newLName === undefined ? '' : req.body.newLName

  const allUsersQ = await sqlQuery(allUsersQuery())

  if (allUsersQ.error) {
    return databaseErrorMessage(res)
  }

  const allUserIDs = allUsersQ.rows.map(user => user.id)

  if (allUserIDs.includes(newId)) {
    return idAlreadyExistsErrorMessage(res)
  }

  const qResult = await sqlQuery(createUser(newId, newFName, newLName, newPin, newRole))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default createUserController
