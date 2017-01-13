import React from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import 'isomorphic-fetch'
import getRoutes from '../app/routes'
import prefetch from 'noxt/server/prefetch'
import config from '../config'

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
            apollo: { data: initialState.apollo.data },
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

export default function (req, res) {
  const client = createApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: `http://localhost:3000/graphql`,
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
    }),
  })
  const store = createStore(client)
  const routes = getRoutes(store)
  match({
    location: req.originalUrl,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {

      const component = (
        <ApolloProvider store={store} client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      getDataFromTree(component)
        .then((context) => {
          const content = renderToString(component)
          const html = renderPage(content, context.store.getState())
          res.status(200).send(html)
        })
        .catch((e) => {
          const content = renderToString(
            <ErrorPage status={e.status} message={e.message} />
          )
          const html = renderPage(content)
          res.status(e.status).send(html)
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}
