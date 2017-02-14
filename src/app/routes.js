import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'app/pages/layouts/PageLayout'

import HomePage from 'app/pages/HomePage'
import AboutPage from 'app/pages/AboutPage'
import WritePage from 'app/pages/WritePage'
import EntryPage from 'app/pages/EntryPage'

import ErrorPage from 'core/app/pages/ErrorPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/write" component={WritePage} />
      <Route path="/post/:id" component={EntryPage} />
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  )
}
