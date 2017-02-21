import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import 'moment/locale/th'

import styles from 'styles/components/PostItem.scss'

const renderDate = date => {
  return moment(date).fromNow()
}

function PostItem ({ post }) {
  return (
    <article key={post._id} className={styles.container}>
      <div className={styles.thumbnail}>
        <Link to={`/post/${post._id}`}>
          <img src={post.img} alt={post.title} />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <h2 className={styles.title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
          <p className={styles.desc}>{post.desc}</p>
        </div>
        <div className={styles.meta}>
          <Link className={styles.category} to={post.category_link} >{post.category}</Link>
          <time className={styles.date}>{renderDate(post.date)}</time>
        </div>
      </div>
    </article>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    img: PropTypes.string,
    category: PropTypes.string.isRequired,
    category_link: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
}

export default PostItem
