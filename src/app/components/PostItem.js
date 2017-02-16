import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from 'styles/components/PostItem.scss'

function PostItem ({ post }) {
  return (
    <article key={post._id}>
      <div className={styles.thumbnail}>
        <img src={post.img} alt={post.title} />
      </div>
      <div className={styles.detail}>
        <h2 className={styles.title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
        <p className={styles.desc}>{post.desc}</p>
      </div>
      <div className={styles.meta}>
        <Link className={styles.category} to={post.category_link} >{post.category}</Link>
        <time className={styles.date}>{post.date}</time>
      </div>
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
