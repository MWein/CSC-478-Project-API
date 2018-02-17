import {
  databaseErrorMessage,
  noAnswerProvidedErrorMessage,
  noQuestionProvidedErrorMessage,
} from '../../errorMessages'
import {
  setSecurityQuestionAndAnswerForUser,
} from '../../db/userManagement'
import { sqlQuery } from '../../db'


const setSecurityQuestionController = async(req, res, next) => {
  const id = res.locals.user.id
  const question = req.body.question
  const answer = req.body.answer

  if (!question) {
    return noQuestionProvidedErrorMessage(res)
  } else if (!answer) {
    return noAnswerProvidedErrorMessage(res)
  }

  const result = await sqlQuery(setSecurityQuestionAndAnswerForUser(id, question, answer))

  if (result.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default setSecurityQuestionController
