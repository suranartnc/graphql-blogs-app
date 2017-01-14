import React, {Component, PropTypes} from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class EntryPage extends Component {

  renderPost () {
    const { data: { loading, post } } = this.props
    if (loading === true) {
      return <div>Loading...</div>
    }
    return (
      <article>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    )
  }

  render () {
    return (
      <div>
        {this.renderPost()}
      </div>
    )
  }
}

EntryPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    })
  }).isRequired
}

const GET_POST = gql`
  query getPost($id: String!) {
    post(_id: $id) {
      _id
      title
      body
    }
  }
`

/*
  graphql = redux's connect
  graphql(query, config)
  query = gql`xxxx`
  config: {
    options(ownProps)         => eg. set variables for the query/mutation, pollInterval
    name                      => rename 'data'
    props({ ownProps, data }) => control mapping data to props
    skip(ownProps)            => eg. skip query for unauthorized user
    withRef                   => access child component, // MyComponentWithUpvote.getWrappedInstance() returns MyComponent instance
    shouldResubscribe
  }
*/
export default graphql(GET_POST, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(EntryPage)
