import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'noxt/app/pages/App'
import Homepage from 'noxt/app/pages/Homepage'
import ErrorPage from 'noxt/app/pages/ErrorPage'

import getCustomRoutes from 'app/routes'

export default function getRoutes (store) {
  return (
    <Route path="/" component={App}>
      {getCustomRoutes()}
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  )
}
