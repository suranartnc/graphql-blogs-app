import React from 'react'
import Helmet from 'react-helmet'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import 'isomorphic-fetch'
import tryRequire from 'try-require'

import getRoutes from '../app/routes'
import config from 'core/config'

import { ApolloProvider, renderToStringWithData  } from 'react-apollo'
import createApolloClient from 'core/app/apollo/createApolloClient'
import { getNetworkInterface, authorizationMiddleware } from 'core/app/apollo/transport'

import createStore from 'core/app/redux/createStore'
import { Provider } from 'react-redux'
import ErrorPage from 'core/app/pages/ErrorPage'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const serverPath = `http://${config.host}:${config.port}/`

let assetsManifest = null
if (process.env.NODE_ENV === 'production') {
  assetsManifest = tryRequire('../../static/build/assets.json')
}

function renderPage (content, initialState = {}) {
  const head = Helmet.rewind()

  const InitialStateScript = ({ state }) => {
    return (
      <script dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__ = ${JSON.stringify(state)}`
      }} />
    )
  }

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
        ${renderToStaticMarkup(<InitialStateScript state={initialState} />)}
        <script src="${serverPath}build/vendor-react.js"></script>
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assetsManifest.main.js}"></script>`
          : `<script src="${wdsPath}main.js"></script>`
        }
      </body>
    </html>
  `
}

function renderErrorPage (status, message, store, res) {
  const content = renderToString(
    <ErrorPage status={status} message={message} />
  )
  const initialState = store.getState()
  const html = renderPage(content, initialState)
  res.status(status).send(html)
}


/*
  Creating a client
    - NetworkInterface (custom URL of GraphqQL server)
  Creating a provider (<ApolloProvider /> = Redux's <Provider />)
    - connect your client instance to your component tree
    - place above any places where you need to access GraphQL data

*/
export default function (req, res) {

  const networkInterface = getNetworkInterface(`http://${config.apiHost}:${config.apiPort}/graphql`, req.headers)
  networkInterface.use(authorizationMiddleware)

  const client = createApolloClient({
    ssrMode: true,    // fetch each query result once (avoid repeated force-fetching)
    networkInterface
  })

  // Create a new client or store instance for each request
  const store = createStore(client)
  const routes = getRoutes(store)

  match({
    location: req.originalUrl,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      renderErrorPage('500', error.message, store, res)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {

      const app = (
        <ApolloProvider store={store} client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )

      // Takes your React tree, determines which queries are needed to render them, and then fetches them all.
      // It returns a promise which resolves when the data is ready in your Apollo Client store.
      // At the point that the promise resolves, your Apollo Client store will be completely initialized,
      //   which should mean your app will now render instantly (since all queries are prefetched)

      // renderToStringWithData = getDataFromTree(app) + renderToString(app)
      renderToStringWithData(app)
        .then((content) => {
          const initialState = store.getState()
          const html = renderPage(content, initialState)
          res.status(200).send(html)
        }, (error) => {
          renderErrorPage('500', error.message, store, res)
        })
        .catch((error) => {
          renderErrorPage(error.status, error.message, store, res)
        })
    } else {
      renderErrorPage('404', 'Not Found', store, res)
    }
  })
}
