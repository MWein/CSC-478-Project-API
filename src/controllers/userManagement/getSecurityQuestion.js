import {
  databaseErrorMessage,
  noError,
  noIdProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import { getUserRow } from '../../db/userManagement'
import { sqlQuery } from '../../db'


const getSecurityQuestionController = async(req, res, next) => {
  const id = req.body.id

  if (!id) {
    return noIdProvidedErrorMessage(res)
  }

  const usersQuery = await sqlQuery(getUserRow(id))

  if (usersQuery.error) {
    return databaseErrorMessage(res)
  } else if (usersQuery.rowNum === 0) {
    return userNotFoundErrorMessage(res)
  }

  const question = usersQuery.rows[0].question

  if (!question) {
    return res.status(449).json({ error: true, errorMsg: 'Security question not set' })
  }

  res.status(200).json({
    question,
    ...noError(),
  })
  next()
}

export default getSecurityQuestionController
