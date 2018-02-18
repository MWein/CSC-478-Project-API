import {
  databaseErrorMessage,
  forbiddenErrorMessage,
  noIdProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import {
  editUser,
  getUserRow,
} from '../../db/userManagement'
import { sqlQuery } from '../../db'


const editUserController = async(req, res, next) => {
  const id = req.body.id

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (id === 'superuser') {
    return forbiddenErrorMessage(res)
  }

  const getUserResult = await sqlQuery(getUserRow(id))

  if (getUserResult.error) {
    return databaseErrorMessage(res)
  }

  if (getUserResult.rows.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  const user = getUserResult.rows[0]

  const f_name = !req.body.f_name ? user.f_name : req.body.f_name
  const l_name = !req.body.l_name ? user.l_name : req.body.l_name
  const role = !req.body.role ? user.role : req.body.role
  const active = !req.body.active ? user.active : req.body.active
  const phoneNum = !req.body.phoneNum ? user.phoneNum : req.body.phoneNum
  const address = !req.body.address ? user.address : req.body.address

  await sqlQuery(editUser(id, f_name, l_name, role, active, phoneNum, address))

  const response = {
    id,
    f_name,
    l_name,
    role,
    active,
    phoneNum,
    address,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(response)
  next()
}

export default editUserController
