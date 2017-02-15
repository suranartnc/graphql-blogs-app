import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { pure, withHandlers, compose } from 'recompose'

import { GET_POSTS } from 'app/modules/post/graphql/postQueries'
import withPreloader from 'hocs/withPreloader'
import PostList from 'components/PostList'
import logo from 'static/images/react.png'
import styles from 'styles/pages/Homepage.scss'

function HomePage ({ data, onNextPageClicked }) {
  return (
    <div className={styles.container}>
      <Helmet
        title="Home"
        meta={[
          {
            name: 'description',
            content: 'This is homepage.'
          }
        ]}
      />
      <img src={logo} width="200" />
      <PostList data={data} />
      <button onClick={onNextPageClicked}>Next page</button>
    </div>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
  onNextPageClicked: PropTypes.func.isRequired
}

const withData = graphql(GET_POSTS, {
  options: {
    forceFetch: true,
    variables: {
      limit: 5,
      offset: 0
    }
  },
  props ({ data }) {
    return {
      data,
      loadNextPage () {
        return data.fetchMore({
          variables: {
            offset: data.posts.length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            return Object.assign({}, prev, {
              posts: [...prev.posts, ...fetchMoreResult.data.posts]
            })
          }
        })
      }
    }
  }
})

export default compose(
  withData,
  withPreloader,
  withHandlers({
    onNextPageClicked: ({ loadNextPage }) => (e) => loadNextPage()
  }),
  pure
)(HomePage)
