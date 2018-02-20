import { imdbMovieSearch } from '../../helpers/imdbMovieSearch'

const imdbMovieSearchController = async(req, res, next) => {
  const response = await imdbMovieSearch

  res.status(response.error ? 500 : 200).json(response)
  next()
}

export default imdbMovieSearchController
