import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import getRoutes from 'noxt/app/routes'
import createStore from 'noxt/app/redux/createStore'

import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import createApolloClient from 'noxt/app/apollo/createApolloClient'

import config from 'noxt/config'

const networkInterface = createNetworkInterface({
  uri: `http://${config.apiHost}:${config.apiPort}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true
})

const client = createApolloClient({
  networkInterface,

  // skip force fetching fires too early during initialization, let's check the data in the cache first
  ssrForceFetchDelay: 100
})

// Rehydrate the client using the initial state passed from the server
const initialState = window.__APOLLO_STATE__
const store = createStore(client, initialState);
const routes = getRoutes(store)
const history = syncHistoryWithStore(browserHistory, store);

const Root = () => (
  <ApolloProvider store={store} client={client}>
    <Router
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </ApolloProvider>
)

export default Root
