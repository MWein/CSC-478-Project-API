import app from './app'

const port = 8081

app.listen(port, () => {
  console.log(' --------------------------------------- ') // eslint-disable-line no-console
  console.log('|                                       |') // eslint-disable-line no-console
  console.log(`|     API listening on port ${port}        |`) // eslint-disable-line no-console
  console.log('|                                       |') // eslint-disable-line no-console
  console.log(' --------------------------------------- ') // eslint-disable-line no-console
})
