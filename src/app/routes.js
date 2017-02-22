import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'pages/layouts/PageLayout'

import HomePage from 'pages/HomePage'
import AboutPage from 'pages/AboutPage'
import GridPage from 'pages/GridPage'
import WritePage from 'pages/WritePage'
import EntryPage from 'pages/EntryPage'

import ErrorPage from 'core/app/pages/ErrorPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/grid" component={GridPage} />
      <Route path="/write" component={WritePage} />
      <Route path="/post/:id" component={EntryPage} />
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  )
}
