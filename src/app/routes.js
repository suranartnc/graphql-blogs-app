import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'pages/layouts/PageLayout'

import HomePage from 'pages/HomePage'
import AboutPage from 'pages/AboutPage'
import WritePage from 'pages/WritePage'
import EntryPage from 'pages/EntryPage'
import ErrorPage from 'core/app/pages/ErrorPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/grid"
        getComponent={(nextState, cb) => {
          if (process.env.BROWSER != true) {
            return cb(null, require('./pages/GridPage').default);
          }
          require.ensure([], require => {
            cb(null, require('./pages/GridPage').default);
          }, 'grid');
        }}
      />
      <Route path="/write" component={WritePage} />
      <Route path="/post/:id" component={EntryPage} />
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  )
}
