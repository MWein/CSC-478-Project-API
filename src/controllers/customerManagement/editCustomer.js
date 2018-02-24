import {
  customerById,
  editCustomer,
} from '../../db/customerManagement'
import {
  databaseErrorMessage,
  forbiddenErrorMessage,
  noIdProvidedErrorMessage,
  userNotFoundErrorMessage,
} from '../../errorMessages'
import { sqlQuery } from '../../db'


const editCustomerController = async(req, res, next) => {
  const id = req.body.id

  if (!id) {
    return noIdProvidedErrorMessage(res)
  } else if (id === 'superuser') {
    return forbiddenErrorMessage(res)
  }

  const getCustomerResult = await sqlQuery(customerById(id))

  if (getCustomerResult.error) {
    return databaseErrorMessage(res)
  }

  if (getCustomerResult.rows.length === 0) {
    return userNotFoundErrorMessage(res)
  }

  const user = getCustomerResult.rows[0]

  const f_name = !req.body.f_name ? user.f_name : req.body.f_name
  const l_name = !req.body.l_name ? user.l_name : req.body.l_name
  const active = req.body.active === undefined ? user.active : req.body.active
  const phone = !req.body.phone ? user.phone : req.body.phone
  const address = !req.body.address ? user.address : req.body.address
  const email = !req.body.email ? user.email : req.body.email

  const convertStrToBool = () => {
    if (active === 'true') {
      return true
    } else if (active === 'false') {
      return false
    }

    return active
  }
  const booleanActive = convertStrToBool()

  const editUserResponse = await sqlQuery(editCustomer(id, f_name, l_name, phone, address, booleanActive, email))

  if (editUserResponse.error) {
    return databaseErrorMessage(res)
  }

  const response = {
    id,
    f_name,
    l_name,
    phone,
    address,
    email,
    active: booleanActive,
    error: false,
    errorMsg: '',
  }

  res.status(200).json(response)
  next()
}

export default editCustomerController
