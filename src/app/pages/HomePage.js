import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import { graphql, withApollo } from 'react-apollo'
import update from 'immutability-helper'

import GET_POSTS_QUERIES from 'app/modules/post/graphql/GetPostsQueries'

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

  onNextPageClicked = (e) => {
    this.props.loadNextPage()
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
        <button onClick={this.onNextPageClicked}>Next page</button>
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
  client: PropTypes.shape({
    query: PropTypes.func.isRequired
  }).isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    }))
  }).isRequired,
  loadNextPage: PropTypes.func.isRequired
}

export default withApollo(graphql(GET_POSTS_QUERIES, {
  options: {
    // pollInterval: 5000   // auto refetch every 5 seconds
    // forceFetch: true
    // ssr: false,          // skip this query during SSR
    variables: {
      limit: 10,
      offset: 0
    },

    // Can be used to achieve the same goal as updateQueries, but more flexible and works with any type of action, not just mutations.

    // reducer = query needs to know what actions should lead to an updated result (recommended)
    // updateQueries = it is the mutation’s responsibility to update all the queries that may need to know about the results of this mutation.
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
        // fetchMore => manually update the result of one query based on the data returned by another query.
        return data.fetchMore({

          // merged with variables of the query associated with the component.
          variables: {
            // limit = same as previous query
            offset: data.posts.length
          },

          // needs to know how to incorporate the result of the query into the information the component is asking for
          // updateQuery(prev, result)
            // prev = previous result of the query in cache (no data key)
            // result.fetchMoreResult = information returned by the fetchMore query
            // result.queryVariables = merged query variables

          // updateQuery = updateQueries with the name of query is the query associated with the component.
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            return Object.assign({}, prev, {
              posts: [...prev.posts, ...fetchMoreResult.data.posts]
            })
          }

          // It can also take a query named argument, which can be a GraphQL document containing a query that will be fetched in order to fetch more information
          // By default, the fetchMore query is the query associated with the component

          // another use case: fetch only items that have been updated and update the list just the newly items (not refetch the whole list)
        })
      }
    }
  }
})(HomePage))
