const permit = permittedRoles => {
  const isAllowed = role => permittedRoles.includes(role)

  return (req, res, next) => {
    if (req.locals.user && isAllowed(req.locals.user.role)) {
      next()
    } else {
      res.status(401).json({ error: true, errorMsg: 'Forbidden' })
    }
  }
}

export default permit
