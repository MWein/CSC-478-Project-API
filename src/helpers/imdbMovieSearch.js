import { XMLHttpRequest } from 'xmlhttprequest'


const deriveJsonFromIMDBResponse = text => {
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
    error: false,
    errorMsg: '',
  }
}


const imdbMovieSearch = async searchStr => {
  const searchableText = searchStr.split(' ').join('_')
  const imdbJsonPath = `https://v2.sg.media-imdb.com/suggests/${searchableText[0]}/${searchableText}.json`

  const getJsonFromIMDB = url => {
    const xmlHttp = new XMLHttpRequest()

    xmlHttp.open('GET', url, false)
    xmlHttp.send(null)

    return xmlHttp.responseText
  }
  const response = await getJsonFromIMDB(imdbJsonPath)

  if (!response) {
    return { error: true, errorMsg: 'No response' }
  }

  return deriveJsonFromIMDBResponse(response)
}


module.exports = {
  deriveJsonFromIMDBResponse,
  imdbMovieSearch,
}
