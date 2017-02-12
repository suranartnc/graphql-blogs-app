import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './Root'

function renderWithHMR (Component) {
  return render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderWithHMR(Root)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRootApp = require('./Root').default
    renderWithHMR(NextRootApp)
  })
}
