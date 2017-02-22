import React, { PropTypes } from 'react'

import PostItem from 'components/PostItem'
import { Container, Row, Col } from 'core/app/components'

function PostList ({ data: { posts } = { posts: [] } }) {
  return (
    <Row>
      {posts.map((post, index) => {
        return (
          <Col md={4}>
            <PostItem key={post._id} post={post} count={index} />
          </Col>
        )
      })}
    </Row>
  )
}

PostList.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PostItem.propTypes.post)
  })
}

export default PostList
