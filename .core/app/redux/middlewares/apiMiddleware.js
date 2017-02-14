require('es6-promise').polyfill()
import 'isomorphic-fetch'

function callApi (url, options) {
  return fetch(url, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        const { status, statusText } = response
        return Promise.reject({
          status,
          message: statusText
        })
      }
      return json
    })
}

export default store => next => action => {
  const { type, request, ...rest } = action
  if (!request) return next(action)

  const { path, options = {} } = request
  if (!path) return next(action)

  const DONE = type
  const REQUEST = `${type}_REQUEST`
  const FAIL = `${type}_FAIL`

  next({ ...rest, type: REQUEST })

  if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH'
    ) {
    options.headers = {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    options.body = JSON.stringify(options.body)
  }

  return callApi(path, options)
    .then(
      data => {
        let response = data
        let result = next({
          ...rest,
          type: DONE,
          response
        })
        return result
      },
      error => {
        return next({
          ...rest,
          type: FAIL,
          error
        })
      }
    )
}
