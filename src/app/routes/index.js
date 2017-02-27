import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'components/pages/layouts/PageLayout'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../containers/HomePageContainer').default)
          }, 'home')
        }}
      />
      <Route path="/about"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../containers/AboutPageContainer').default)
          }, 'about')
        }}
      />
      <Route path="/grid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../containers/GridPageContainer').default)
          }, 'grid')
        }}
      />
      <Route path="/write"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../containers/WritePageContainer').default)
          }, 'write')
        }}
      />
      <Route path="/post/:id"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../containers/EntryPageContainer').default)
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
