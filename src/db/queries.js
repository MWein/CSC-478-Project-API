export const selectAllRows = () => ({
  text: 'SELECT * FROM "test_table"',
})


// users table queries
export const allUsers = () => ({
  text: 'SELECT * FROM "users"',
})

export const getUserRow = id => ({
  text: 'SELECT * FROM "users" WHERE id = ($1)',
  values: [ id ],
})

export const updateTimestampForUser = (id, timestamp) => ({
  text: 'UPDATE users SET timestamp = ($1) WHERE id = ($2)',
  values: [ timestamp, id ],
})

export const updateTokenAndTimestampForUser = (id, token, timestamp) => ({
  text: 'UPDATE users SET token = ($1), timestamp = ($2) WHERE id = ($3)',
  values: [ token, timestamp, id ],
})
