import {
  allUsers as allUsersQuery,
  updateTokenAndTimestampForUser,
} from '../db/userManagement'
import {
  databaseErrorMessage,
  incorrectAnswerErrorMessage,
  noAnswerProvidedErrorMessage,
  noIdProvidedErrorMessage,
  securityQuestionNotSetErrorMessage,
  userNotFoundErrorMessage,
} from '../errorMessages'
import { generateUniqueKey } from '../helpers/generateUniqueKey'
import { sqlQuery } from '../db'


const sqLoginController = async(req, res, next) => {
  const id = req.body.id
  const answer = req.body.answer

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (!answer) {
    return noAnswerProvidedErrorMessage(res)
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


  if (!user.question || !user.answer) {
    return securityQuestionNotSetErrorMessage(res)
  }


  if (user.answer !== answer) {
    return incorrectAnswerErrorMessage(res)
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

export default sqLoginController
