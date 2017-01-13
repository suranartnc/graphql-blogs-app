import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'app/pages/layouts/PageLayout'
import HomePage from 'app/pages/HomePage'
import AboutPage from 'app/pages/AboutPage'
import ErrorPage from 'noxt/app/pages/ErrorPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  )
}
