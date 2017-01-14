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

export default graphql(GET_POST, {
  options: ({ params }) => ({
    variables: {
      id: params.id
    }
  })
})(EntryPage)
