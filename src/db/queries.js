// users table queries
export const allUsers = () => ({
  text: 'SELECT * FROM "users"',
})

export const getUserRow = id => ({
  text: 'SELECT * FROM "users" WHERE id = ($1)',
  values: [ id ],
})

export const createUser = (id, f_name, l_name, password, role) => ({
  text: 'INSERT INTO users (id, f_name, l_name, pin, token, timestamp, role) VALUES (($1), ($2), ($3), ($4), \'\', \'\', ($5))',
  values: [ id, f_name, l_name, password, role ],
})

export const deleteUser = id => ({
  text: 'DELETE FROM "users" WHERE id = ($1)',
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
