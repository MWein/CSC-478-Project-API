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
  const active = req.body.active === undefined ? user.active : req.body.active
  const phone = !req.body.phone ? user.phone : req.body.phone
  const address = !req.body.address ? user.address : req.body.address

  const convertStrToBool = () => {
    if (active === 'true') {
      return true
    } else if (active === 'false') {
      return false
    }

    return active
  }
  const booleanActive = convertStrToBool()

  const editUserResponse = await sqlQuery(editUser(id, f_name, l_name, role, booleanActive, phone, address))

  if (editUserResponse.error) {
    return databaseErrorMessage(res)
  }

  const response = {
    id,
    f_name,
    l_name,
    role,
    active: booleanActive,
    phone,
    address,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(response)
  next()
}

export default editUserController
