import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from 'styles/components/PostItem.scss'

function PostItem ({ post: { _id, title }, count }) {
  return (
    <article key={_id} className={styles.postItem}>
      <Link to={`/post/${_id}`}>
        <img src={`http://lorempixel.com/400/250/nature/${count}`} alt={title} />
      </Link>
      <h2 className={styles.postTitle}>
        <Link to={`/post/${_id}`}>{title}</Link>
      </h2>
    </article>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  count: PropTypes.string
}

export default PostItem
