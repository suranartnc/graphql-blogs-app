import React, { PropTypes } from 'react'

import PostItem from 'components/PostItem'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div>
      <ul>
        {posts.map((post, index) => <PostItem key={post._id} post={post} count={index} />)}
      </ul>
    </div>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PostItem.propTypes.post)
  })
}

export default PostList
