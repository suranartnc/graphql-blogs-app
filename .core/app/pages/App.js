import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

function App (props) {
  return (
    <div>
      <Helmet title="GraphQL Blog App" />
      { props.children }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node
}

export default App
