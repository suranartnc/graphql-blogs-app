import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from 'styles/components/PostList.scss'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div>
      {posts.map(post => (
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
      ))}
    </div>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }))
  })
}

export default PostList
