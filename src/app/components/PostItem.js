import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from 'styles/components/PostItem.scss'

function PostItem ({ post: { _id, title }, count }) {
  return (
    <li key={_id} className={styles.postItem}>
      <img src={`http://lorempixel.com/400/250/nature/${count}`} alt={title} />
      <Link to={`/post/${_id}`}>
        <h2 className={styles.postTitle}>{title}</h2>
      </Link>
    </li>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired
}

export default PostItem
