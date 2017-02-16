import React, { PropTypes } from 'react'

function PostEntry ({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  )
}

PostEntry.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired
}

export default PostEntry
