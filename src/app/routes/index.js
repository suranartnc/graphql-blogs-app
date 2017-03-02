import React from 'react'
import { Route, IndexRoute } from 'react-router'

import FullLayout from 'components/layouts/Full/FullLayout'

export default function getRoutes () {
  return (
    <Route component={FullLayout}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/Home/HomePageContainer').default)
          }, 'home')
        }}
      />
      <Route path="/about"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/About/AboutPageContainer').default)
          }, 'about')
        }}
      />
      <Route path="/grid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/Grid/GridPageContainer').default)
          }, 'grid')
        }}
      />
      <Route path="/write"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/Write/WritePageContainer').default)
          }, 'write')
        }}
      />
      <Route path="/post/:id"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/Entry/EntryPageContainer').default)
          }, 'entry')
        }}
      />
      <Route path="*"
        status="404"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../components/pages/Error/ErrorPageContainer').default)
          }, 'error')
        }}
      />
    </Route>
  )
}
