import React from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import 'isomorphic-fetch'
import getRoutes from '../app/routes'
import config from 'noxt/config'

import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import createApolloClient from 'noxt/app/apollo/createApolloClient'

import createStore from 'noxt/app/redux/createStore'
import { Provider } from 'react-redux'
import ErrorPage from 'noxt/app/pages/ErrorPage'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const serverPath = `http://${config.host}:${config.port}/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

function renderPage (content, initialState = {}) {
  const head = Helmet.rewind()
  return `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.main.css}" />` : ''}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify({
            ...initialState,
          apollo: { data: typeof initialState.apollo.data !== 'undefined' ? initialState.apollo.data : null },
          })}
        </script>
        <script src="${serverPath}build/vendor-react.js"></script>
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assetsManifest.main.js}"></script>`
          : `<script src="${wdsPath}main.js"></script>`
        }
      </body>
    </html>
  `
}

function renderErrorPage (status, message, client, res) {
  const content = renderToString(
    <ErrorPage status={status} message={message} />
  )
  const initialState = { 'apollo': client.getInitialState() }
  const html = renderPage(content, initialState)
  res.status(status).send(html)
}

export default function (req, res) {
  const networkInterface = createNetworkInterface({
    uri: `http://${config.host}:${config.port}/graphql`,
    opts: {
      credentials: 'same-origin',
      headers: req.headers
    }
  })
  const client = createApolloClient({
    networkInterface,
    ssrMode: true
  })
  const store = createStore(client)
  const routes = getRoutes(store)

  match({
    location: req.originalUrl,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      renderErrorPage('500', error.message, client, res)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const app = (
        <ApolloProvider store={store} client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      getDataFromTree(app)
        .then(() => {
          const content = renderToString(app)
          const initialState = { 'apollo': client.getInitialState() }
          const html = renderPage(content, initialState)
          res.status(200).send(html)
        }, (error) => {
          renderErrorPage('500', error.message, client, res)
        })
        .catch((error) => {
          renderErrorPage(error.status, error.message, client, res)
        })
    } else {
      renderErrorPage('404', 'Not Found', client, res)
    }
  })
}
