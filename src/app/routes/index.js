import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'pages/layouts/PageLayout'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./HomePage').default)
          }, 'home')
        }}
      />
      <Route path="/about"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./AboutPage').default)
          }, 'about')
        }}
      />
      <Route path="/grid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./GridPage').default)
          }, 'grid')
        }}
      />
      <Route path="/write"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./WritePage').default)
          }, 'write')
        }}
      />
      <Route path="/post/:id"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./EntryPage').default)
          }, 'entry')
        }}
      />
      <Route path="*"
        status="404"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../../../.core/app/pages/ErrorPage').default)
          }, 'error')
        }}
      />
    </Route>
  )
}
