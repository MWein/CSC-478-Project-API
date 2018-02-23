import { noError } from '../errorMessages'

const imdbResponseParser = text => {
  if (!text) {
    return { error: true, errorMsg: 'No response' }
  }

  const responseJson = JSON.parse(text.substring(text.indexOf('(') + 1, text.length - 1))

  const permittedItems = [ 'feature' ]
  const movieData = responseJson.d.filter(item => item.q && permittedItems.includes(item.q))
    .map(movie => ({
      title: movie.l,
      year: movie.y,
      poster: movie.i[0],
    }))

  return {
    data: movieData,
    ...noError(),
  }
}

export default imdbResponseParser
