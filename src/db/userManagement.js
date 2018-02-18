// users table queries
export const allUsers = () => ({
  text: 'SELECT * FROM "users"',
})

export const getUserRow = id => ({
  text: 'SELECT * FROM "users" WHERE id = ($1)',
  values: [ id ],
})

export const createUser = (id, f_name, l_name, password, role, active) => ({
  text: 'INSERT INTO users (id, f_name, l_name, pin, token, timestamp, role, active) VALUES (($1), ($2), ($3), ($4), \'\', \'\', ($5), ($6))',
  values: [ id, f_name, l_name, password, role, active ],
})

export const editUser = (id, f_name, l_name, role, active, phoneNum, address) => ({
  text: 'UPDATE users SET f_name = ($2), l_name = ($3), role = ($4), active = ($5), phoneNum = ($6), address = ($7) WHERE id = ($1)',
  values: [ id, f_name, l_name, role, active, phoneNum, address ],
})

export const setUserPin = (id, pin) => ({
  text: 'UPDATE users SET pin = ($1) WHERE id = ($2)',
  values: [ pin, id ],
})

export const setSecurityQuestionAndAnswerForUser = (id, ques, ans) => ({
  text: 'UPDATE users SET question = ($1), answer = ($2) WHERE id = ($3)',
  values: [ ques, ans, id ],
})

export const updateTimestampForUser = (id, timestamp) => ({
  text: 'UPDATE users SET timestamp = ($1) WHERE id = ($2)',
  values: [ timestamp, id ],
})

export const updateTokenAndTimestampForUser = (id, token, timestamp) => ({
  text: 'UPDATE users SET token = ($1), timestamp = ($2) WHERE id = ($3)',
  values: [ token, timestamp, id ],
})
