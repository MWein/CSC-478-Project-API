import {
  bestMovies,
} from '../../db/transactionManagement'
import { sqlQuery } from '../../db'


const mostPopularMoviesController = async(req, res, next) => {
  const limit = req.body.limit
  const results = await sqlQuery(bestMovies(limit))

  res.status(200).json(results.rows)
  next()
}

export default mostPopularMoviesController
