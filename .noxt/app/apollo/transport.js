import { createNetworkInterface } from 'apollo-client'
import config from 'noxt/config'

export function getNetworkInterface (uri = '/graphql', headers = {}, shouldBatch = false) {
  return createNetworkInterface({
    uri,
    opts: {

      // Tell your network interface to send the cookie along with every request
      credentials: 'same-origin',

      // transfer request headers to networkInterface
      headers,

      // Chec a queue every 10 milliseconds to see if there are any pending queries.
      // If there are multiple queries in the queue, they are combined into one server request.
      shouldBatch
    }
  })
}

export const authorizationMiddleware = [{

  // Modify requests before they are sent to the server
  applyMiddleware(req, next) {

    // Create the header object if needed.
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token')
    const token = 'put a token here'  // which usually kept in cookies
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}]
