import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)

module.exports = app
