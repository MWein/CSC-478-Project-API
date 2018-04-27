import { openTransactions } from '../../db/transactionManagement'
import { returnMovieCopy } from '../../db/movieManagement'
import { sqlQuery } from '../../db'


const returnMovieController = async(req, res, next) => {
  const copyIDs = req.body.copyIDs
  const responses = await copyIDs.map(copyID => sqlQuery(returnMovieCopy(copyID)))

  await Promise.all(responses)

  const newTransactions = await sqlQuery(openTransactions())

  res.status(200).json(newTransactions.rows)
  next()
}

export default returnMovieController
