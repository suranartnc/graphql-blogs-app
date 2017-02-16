import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { compose, pure } from 'recompose'

import { GET_POST } from 'app/modules/post/graphql/postQueries'
import withPreloader from 'hocs/withPreloader'
import PostEntry from 'components/PostEntry'

function EntryPage ({ data }) {
  return (
    <div>
      <PostEntry data={data} />
    </div>
  )
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

export default compose(
  graphql(GET_POST, {
    options: ({ params: { id } }) => ({
      variables: {
        id
      }
    })
  }),
  withPreloader,
  pure
)(EntryPage)
