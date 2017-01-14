import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import CSSModules from 'react-css-modules'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import styles from 'styles/pages/Homepage.scss'

const GET_POSTS = gql`
  query getPosts {
    posts(limit: 10) {
      _id
      title
    }
  }
`

@CSSModules(styles)
class HomePage extends Component {

  renderPosts () {
    const { data: { posts } } = this.props
    return posts.map(data => (
      <p key={data._id}>{data.title}</p>
    ))
  }

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
        {this.renderPosts()}
      </div>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    }))
  }).isRequired
}

export default graphql(GET_POSTS)(HomePage)
