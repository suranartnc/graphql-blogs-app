import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from 'styles/components/PostItem.scss'

function PostItem ({ post }) {
  return (
    <article>
      <h2 className={styles.title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
    </article>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostItem
