import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import { graphql } from 'react-apollo'
import update from 'immutability-helper'
import { pure, branch, renderComponent, withHandlers, compose } from 'recompose'
import { GET_POSTS } from 'app/modules/post/graphql/postQueries'

import logo from 'static/images/react.png'
import styles from 'styles/pages/Homepage.scss'

const Preloader = () => (
  <div>Loading...</div>
)

const displayLoadingState = branch(
  (props) => props.data.loading,
  renderComponent(Preloader),
)

function PostList ({ data: { loading, posts } = { posts: [] } }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post._id}>
          <h2 className={styles.title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
        </article>
      ))}
    </div>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }))
  })
}

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

const data = graphql(GET_POSTS, {
  options: {
    variables: {
      limit: 5,
      offset: 0
    },
    reducer: (previousResult, action, variables) => {
      if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'addPost') {
        return update(previousResult, {
          posts: {
            $unshift: [action.result.data.addPost.post]
          }
        })
      }
      return previousResult
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
  data,
  displayLoadingState,
  withHandlers({
    onNextPageClicked: ({ loadNextPage }) => (e) => loadNextPage()
  }),
  pure
)(HomePage)
