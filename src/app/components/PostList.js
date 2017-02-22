import React, { PropTypes } from 'react'

import PostItem from 'components/PostItem'
import s from 'styles/components/PostList.scss'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div className={s.container}>
      {posts.map((post, index) => {
        return (
          <PostItem key={post._id} post={post} count={index} />
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
