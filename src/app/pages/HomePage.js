import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
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
    const { data: { loading, posts } } = this.props
    if (loading === true) {
      return <div>Loading...</div>
    }
    return posts.map(post => (
      <article key={post._id}>
        <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
      </article>
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

/*
  The structure of the data prop

  data: {
    posts: { ... },

    loading: false,
    error: null,
    refetch() { ... },
    fetchMore() { ... },
    startPolling() { ... },
    stopPolling() { ... },
    // ... more methods from the QuerySubscription object
  }
*/

HomePage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    }))
  }).isRequired
}

export default graphql(GET_POSTS)(HomePage)
