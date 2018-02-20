import { XMLHttpRequest } from 'xmlhttprequest'
import imdbResponseParser from '../../helpers/imdbResponseParser'


const imdbMovieSearchController = async(req, res, next) => {
  const searchStr = req.body.searchStr

  if (!searchStr) {
    return res.status(449).json({ error: true, errorMsg: 'No search string provided' })
  }

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

  const responseJSON = imdbResponseParser(response)

  res.status(responseJSON.error ? 500 : 200).json(responseJSON)
  next()
}

export default imdbMovieSearchController
