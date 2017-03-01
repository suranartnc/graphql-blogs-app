import React, { PropTypes } from 'react'

import PostItem from '../PostItem/PostItem'
import s from './PostList.scss'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div className={s.container}>
      {posts.map((post, index) => {
        return (
          <PostItem key={post._id} post={post} count={index} theme="dark" />
        )
      })}
    </div>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PostItem.propTypes.post)
  })
}

export default PostList
