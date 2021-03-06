import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
// import proxy from 'http-proxy-middleware'

import ssrMiddleware from 'core/server/ssrMiddleware'
import config from 'core/config'

const app = express()

// app.use('/graphql', proxy({
//   target: `http://${config.apiHost}:${config.apiPort}`
// }))

app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(ssrMiddleware)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Web server listening on ${config.host}:${config.port}`)
})
