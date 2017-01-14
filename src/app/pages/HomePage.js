import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import CSSModules from 'react-css-modules'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import styles from 'styles/pages/Homepage.scss'

const GET_POSTS = gql`
  query getPosts($limit: Int) {
    posts(limit: 10) {
      _id
      title
    }
  }
`

@CSSModules(styles)
class HomePage extends Component {
  render () {
    return (
      <div styleName="container">
        <Helmet
          title="Home"
          meta={[
            {
              name: 'description',
              content: 'This is homepage.'
            }
          ]}
        />
        HomePage
      </div>
    )
  }
}

export default graphql(GET_POSTS)(HomePage)
