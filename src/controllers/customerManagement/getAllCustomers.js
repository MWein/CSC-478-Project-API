import { allUsers } from '../../db/userManagement'
import { databaseErrorMessage } from '../../errorMessages'
import { sqlQuery } from '../../db'


const getAllCustomersController = async(req, res, next) => {
  const phone = req.body.phone
  const excludeInactive = req.body.excludeInactive

  const customerQuery = await sqlQuery(allUsers())

  if (customerQuery.error) {
    return databaseErrorMessage(res)
  }

  const customerList = !phone ?
    customerQuery.rows :
    customerQuery.rows.filter(customer => customer.phone === phone)

  const activeCustomerList = excludeInactive === true || excludeInactive === 'true' ?
    customerList.filter(customer => customer.active) :
    customerList

  const returnVal = {
    ...customerQuery,
    rows: activeCustomerList,
    errorMsg: '',
  }

  res.status(200).json(returnVal)
  next()
}

export default getAllCustomersController
