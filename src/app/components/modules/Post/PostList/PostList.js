import React, { PropTypes } from 'react'

import s from './styles.scss'

function PostList (props) {
  const {
    data: {
      posts
    } = {
      posts: []
    },
    template: PostItem
  } = props

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
    posts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    }))
  }),
  template: PropTypes.func.isRequired
}

export default PostList
