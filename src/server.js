import app from './app'

const port = 8080

app.listen(port, () => {
  console.log(' --------------------------------------- ') // eslint-disable-line no-console
  console.log('|                                       |') // eslint-disable-line no-console
  console.log(`|     API listening on port ${port}        |`) // eslint-disable-line no-console
  console.log('|      DO NOT CLOSE THIS WINDOW         |') // eslint-disable-line no-console
  console.log('|                                       |') // eslint-disable-line no-console
  console.log(' --------------------------------------- ') // eslint-disable-line no-console
})
