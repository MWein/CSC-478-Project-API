export const userNotFoundMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'User not found' })
}

export const databaseErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'Database error' })
}

export const timeoutErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'Session timeout' })
}

export const userNotFoundErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'User not found' })
}

export const noIdProvidedErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'No ID provided' })
}

export const noPinProvidedErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'No pin provided' })
}

export const noTokenProvidedErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'No token provided' })
}

export const invalidCredentialsErrorMessage = res => {
  res.status(500).json({ error: true, errorMsg: 'Invalid credentials' })
}

export const forbiddenErrorMessage = res => {
  res.status(401).json({ error: true, errorMsg: 'Forbidden' })
}
