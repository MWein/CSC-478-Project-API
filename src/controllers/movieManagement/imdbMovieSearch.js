import { imdbMovieSearch } from '../../helpers/imdbMovieSearch'

const imdbMovieSearchController = async(req, res, next) => {
  const searchStr = req.body.searchStr

  const response = await imdbMovieSearch(searchStr)

  res.status(response.error ? 500 : 200).json(response)
  next()
}

export default imdbMovieSearchController
