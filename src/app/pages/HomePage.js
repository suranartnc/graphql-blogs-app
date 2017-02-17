import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { pure, withHandlers, compose } from 'recompose'

import { GET_POSTS } from 'app/modules/post/graphql/postQueries'
import { fetchMore as fetchMoreUtil } from 'utils/apollo'
import withCache from 'hocs/withCache'
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
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func.isRequired
  }),
  onNextPageClicked: PropTypes.func.isRequired
}

export default compose(
  withCache,
  graphql(GET_POSTS, {
    options: {
      forceFetch: true,
      variables: {
        limit: 5,
        offset: 0
      }
    }
  }),
  withPreloader,
  withHandlers({
    onNextPageClicked: ({ data: { posts, fetchMore } }) => event => fetchMoreUtil({
      name: 'posts',
      data: posts,
      fetchMore
    })
  }),
  pure
)(HomePage)
