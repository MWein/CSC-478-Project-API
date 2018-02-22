const healthController = (req, res, next) => {
  res.status(200).send('ok')
  next()
}

export default healthController
