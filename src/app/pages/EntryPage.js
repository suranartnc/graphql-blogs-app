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

const withData = graphql(GET_POST, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})

export default compose(
  withData,
  withPreloader,
  pure
)(EntryPage)
