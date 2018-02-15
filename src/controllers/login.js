import {
  allUsers as allUsersQuery,
  updateTokenAndTimestampForUser,
} from '../db/queries'
import {
  databaseErrorMessage,
  invalidCredentialsErrorMessage,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  userNotFoundMessage,
} from '../errorMessages'
import { generateUniqueKey } from '../helpers/generateUniqueKey'
import { sqlQuery } from '../db'


const loginController = async(req, res, next) => {
  const id = req.body.id
  const pin = req.body.pin

  if (id === undefined) {
    return noIdProvidedErrorMessage(res)
  }
  if (pin === undefined) {
    return noPinProvidedErrorMessage(res)
  }

  const queryData = await sqlQuery(allUsersQuery())

  if (queryData.error) {
    return databaseErrorMessage(res)
  }

  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return userNotFoundMessage(res)
  }

  const user = matchingUsers[0]

  if (user.pin !== pin) {
    return invalidCredentialsErrorMessage(res)
  }

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
    error: false,
    errorMsg: '',
  }

  res.status(200).json(resultJson)
  next()
}

export default loginController
