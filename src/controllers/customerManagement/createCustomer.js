import {
  allCustomers,
  createCustomer,
} from '../../db/customerManagement'
import {
  databaseErrorMessage,
  noFNameProvidedErrorMessage,
  noLNameProvidedErrorMessage,
  noPhoneNumProvidedErrorMessage,
} from '../../errorMessages'
import { generateUniqueKey } from '../../helpers/generateUniqueKey'
import { sqlQuery } from '../../db'


const createCustomerController = async(req, res, next) => {
  const f_name = req.body.f_name
  const l_name = req.body.l_name
  const phone = req.body.phone

  if (!f_name) {
    return noFNameProvidedErrorMessage(res)
  } else if (!l_name) {
    return noLNameProvidedErrorMessage(res)
  } else if (!phone) {
    return noPhoneNumProvidedErrorMessage(res)
  }

  const allCustomersQ = await sqlQuery(allCustomers())

  if (allCustomersQ.error) {
    return databaseErrorMessage(res)
  }
  const allCustomerIds = allCustomersQ.rows.map(customer => customer.id)

  const id = generateUniqueKey(allCustomerIds)
  const address = !req.body.address ? '' : req.body.address
  const email = !req.body.email ? '' : req.body.email

  const qResult = await sqlQuery(createCustomer(id, f_name, l_name, phone, address, true, email))

  if (qResult.error) {
    return databaseErrorMessage(res)
  }

  res.status(200).json({ error: false, errorMsg: '' })
  next()
}

export default createCustomerController
