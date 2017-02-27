import React, { PropTypes } from 'react'

import s from 'styles/components/PostEntry.scss'

function PostEntry ({ post }) {
  return (
    <article className={s.PostEntry}>
      <div className={s.header}>
        <h1 className={s.title}>{post.title}</h1>
      </div>
      <div className={s.content}>
        <p dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
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
