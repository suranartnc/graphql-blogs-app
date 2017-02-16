import React, { PropTypes } from 'react'

import PostItem from 'components/PostItem'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div>
<<<<<<< HEAD
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
=======
      {posts.map(post => <PostItem key={post._id} post={post} />)}
>>>>>>> origin/master
    </div>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PostItem.propTypes.post)
  })
}

export default PostList
