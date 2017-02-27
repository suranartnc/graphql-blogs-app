import React, { PropTypes } from 'react'
import PostEntry from 'components/PostEntry'

function EntryPage ({ data: { post } }) {
  return (
    <div>
      <PostEntry post={post} />
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

export default EntryPage
