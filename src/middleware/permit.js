const permit = permittedRoles => {
  const isAllowed = role => permittedRoles.includes(role)

  return (req, res, next) => {
    if (res.locals.user && isAllowed(res.locals.user.role)) {
      next()
    } else {
      res.status(401).json({ error: true, errorMsg: 'Forbidden' })
    }
  }
}

export default permit
