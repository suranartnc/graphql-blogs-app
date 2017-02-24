import React from 'react'
import { render } from 'react-dom'
import { match, browserHistory } from 'react-router'

import Root from './Root'

import getRoutes from 'core/app/routes'

const history = browserHistory
const routes = getRoutes()

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Root {...renderProps} />,
    document.getElementById('root')
  )
})
