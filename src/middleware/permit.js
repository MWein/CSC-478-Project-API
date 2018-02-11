const permit = permittedRoles => {
  const isAllowed = role => permittedRoles.includes(role)

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next()
    } else {
      res.status(401).json({ error: true, errorMsg: 'Forbidden' })
    }
  }
}

export default permit
