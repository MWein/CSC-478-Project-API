import {
  allUsers as allUsersQuery,
  updateTokenAndTimestampForUser,
} from '../db/userManagement'
import {
  databaseErrorMessage,
  incorrectAnswerErrorMessage,
  invalidCredentialsErrorMessage,
  noError,
  noIdProvidedErrorMessage,
  noPinProvidedErrorMessage,
  securityQuestionNotSetErrorMessage,
  userNotFoundErrorMessage,
} from '../errorMessages'
import { generateUniqueKey } from '../helpers/generateUniqueKey'
import { sqlQuery } from '../db'


const loginController = async(req, res, next) => {
  const id = req.body.id
  const pin = req.body.pin
  const answer = req.body.answer

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (!pin && !answer) {
    return noPinProvidedErrorMessage(res)
  }

  const queryData = await sqlQuery(allUsersQuery())

  if (queryData.error) {
    return databaseErrorMessage(res)
  }

  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  const user = matchingUsers[0]

  if (!pin) {
    if (!user.question || !user.answer) {
      return securityQuestionNotSetErrorMessage(res)
    } else if (user.answer !== answer) {
      return incorrectAnswerErrorMessage(res)
    }
  } else if (user.pin !== pin) {
    return invalidCredentialsErrorMessage(res)
  }

  if (!user.active) {
    return invalidCredentialsErrorMessage(res)
  }

  const needsSecurityQuestion = !user.question || !user.answer

  const allTokens = allUsers.map(user => user.token)

  const newToken = generateUniqueKey(allTokens)
  const timestamp = new Date()

  const response = await sqlQuery(updateTokenAndTimestampForUser(id, newToken, timestamp))

  if (response.error) {
    return databaseErrorMessage(res)
  }

  const resultJson = {
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    role: user.role,
    token: newToken,
    needsSecurityQuestion,
    ...noError(),
  }

  res.status(200).json(resultJson)
  next()
}

export default loginController
