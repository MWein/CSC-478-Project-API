const healthController = (req, res, next) => {
  // TODO Check status of users database
  // TODO Check status of customers database
  // TODO Check connection to IMDB

  res.status(200).send('ok')
  next()
}

export default healthController
