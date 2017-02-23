import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import getRoutes from 'core/app/routes'
import createStore from 'core/app/redux/createStore'

import { ApolloProvider } from 'react-apollo'
import createApolloClient from 'core/app/apollo/createApolloClient'
import { getNetworkInterface, authorizationMiddleware } from 'core/app/apollo/transport'

import config from 'core/config'

const networkInterface = getNetworkInterface(`http://${config.apiHost}:${config.apiPort}/graphql`, {})
networkInterface.use(authorizationMiddleware)

const client = createApolloClient({
  networkInterface,

  // skip force fetching fires too early during initialization, let's check the data in the cache first
  ssrForceFetchDelay: 500
})

// Rehydrate the client using the initial state passed from the server
const initialState = window.__APOLLO_STATE__
const store = createStore(client, initialState);
const routes = getRoutes(store)
const history = syncHistoryWithStore(browserHistory, store);

const Root = (props) => (
  <ApolloProvider store={store} client={client}>
    <Router
      {...props}
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </ApolloProvider>
)

export default Root
