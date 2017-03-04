import React from 'react'

import { storiesOf } from '@kadira/storybook'

import PostList from './PostList'
import mockData from 'utils/mockData'

const props = {
  data: {
    loading: true,
    posts: mockData(3)
  }
}

storiesOf('PostList', module)
  .add('with 3 Posts', () => (
    <PostList {...props} />
  ))
