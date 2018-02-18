import {
  allUsers as allUsersQuery,
  createUser,
  updateTokenAndTimestampForUser,
} from '../db/userManagement'
import {
  databaseErrorMessage,
  invalidCredentialsErrorMessage,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../errorMessages'
import { generateUniqueKey } from '../helpers/generateUniqueKey'
import { sqlQuery } from '../db'


const loginController = async(req, res, next) => {
  const id = req.body.id
  const pin = req.body.pin

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (!pin) {
    return noPinProvidedErrorMessage(res)
  }

  const queryData = await sqlQuery(allUsersQuery())

  if (queryData.error) {
    return databaseErrorMessage(res)
  }

  const getAllUsers = async() => {
    if (queryData.rows.length === 0) {
      await sqlQuery(createUser('superuser', '', '', 'password', 'admin', true))
      const newQueryData = await sqlQuery(allUsersQuery())

      return newQueryData.rows
    }

    return queryData.rows
  }
  const allUsers = await getAllUsers()

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  const user = matchingUsers[0]

  if (user.pin !== pin) {
    return invalidCredentialsErrorMessage(res)
  }

  const needsSecurityQuestion = !user.question || !user.answer

  const allTokens = allUsers.map(user => user.token)

  const newToken = generateUniqueKey(allTokens)
  const timestamp = new Date()

  await sqlQuery(updateTokenAndTimestampForUser(id, newToken, timestamp))

  const resultJson = {
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    role: user.role,
    token: newToken,
    needsSecurityQuestion,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(resultJson)
  next()
}

export default loginController
