export const forbiddenErrorMessage = res => {
  res.status(403).json({ error: true, errorMsg: 'Forbidden' })
}

export const userNotFoundErrorMessage = res => {
  res.status(404).json({ error: true, errorMsg: 'User not found' })
}

export const timeoutErrorMessage = res => {
  res.status(408).json({ error: true, errorMsg: 'Session timeout' })
}

export const databaseErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'Database error' })
}

export const invalidCredentialsErrorMessage = res => {
  res.status(401).json({ error: true, errorMsg: 'Invalid credentials' })
}

export const noIdProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No ID provided' })
}

export const noPinProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No pin provided' })
}

export const noRoleProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No role provided' })
}

export const noQuestionProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No question provided' })
}

export const noAnswerProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No answer provided' })
}

export const securityQuestionNotSetErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'Security question not set' })
}

export const incorrectAnswerErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'Incorrect answer' })
}

export const idAlreadyExistsErrorMessage = res => {
  res.status(400).json({ error: true, errorMsg: 'ID already exists' })
}

export const noTokenProvidedErrorMessage = res => {
  res.status(449).json({ error: true, errorMsg: 'No token provided' })
}
