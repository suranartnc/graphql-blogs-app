import React, { PropTypes } from 'react'

import PostItem from 'components/PostItem'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <div>
      <ul>
        {posts.map(post => <PostItem key={post._id} post={post} />)}
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
