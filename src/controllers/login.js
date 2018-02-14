import {
  allUsers as allUsersQuery,
  updateTokenAndTimestampForUser,
} from '../db/queries'
import { sqlQuery } from '../db'


export const generateUniqueKey = keys => {
  const chars = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]

  const generateKeyHelper = key => {
    const letter = Math.floor(Number(Math.random()) * 25)
    const newKey = `${key}${chars[letter]}`

    if (newKey.length >= 10 && !keys.includes(newKey)) {
      return newKey
    } else if (keys.includes(newKey)) {
      return generateKeyHelper('')
    }

    return generateKeyHelper(newKey)
  }

  return generateKeyHelper('')
}


const sendInvalidCredentials = res => {
  res.status(400).json({
    error: true,
    errorMsg: 'Invalid credentials',
  })
}

export const logUserIn = async(id, newToken, timestamp) => {
  await sqlQuery(updateTokenAndTimestampForUser(id, newToken, timestamp))
}

const loginController = async(req, res, next) => {
  const id = req.body.id
  const pin = req.body.pin

  if (id === undefined || pin === undefined) {
    return sendInvalidCredentials(res)
  }

  const queryData = await sqlQuery(allUsersQuery())
  const allUsers = queryData.rows

  const matchingUsers = allUsers.filter(x => x.id === id)

  if (matchingUsers.length === 0) {
    return sendInvalidCredentials(res)
  }

  const user = matchingUsers[0]

  if (user.pin !== pin) {
    return sendInvalidCredentials(res)
  }

  const allTokens = allUsers.map(user => user.token)

  const newToken = generateUniqueKey(allTokens)
  const timestamp = new Date()

  logUserIn(id, newToken, timestamp)

  const resultJson = {
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    token: newToken,
  }

  res.status(200).json(resultJson)
  next()
}

export default loginController
