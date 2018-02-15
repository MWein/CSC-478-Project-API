import { forbiddenErrorMessage } from '../errorMessages'

const permit = permittedRoles => {
  const isAllowed = role => permittedRoles.includes(role)

  return (req, res, next) => {
    if (res.locals.user && isAllowed(res.locals.user.role)) {
      next()
    } else {
      forbiddenErrorMessage(res)
    }
  }
}

export default permit
