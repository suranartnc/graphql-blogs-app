import React from 'react'

import { storiesOf } from '@kadira/storybook'

import PostList from './PostList'
import PostItem from '../PostItem/PostItem'

import mockData from 'utils/mockData'

const props = {
  data: {
    loading: true,
    posts: mockData(4)
  },
  PostItem
}

storiesOf('PostList', module)
  .add('with 3 Posts', () => (
    <PostList {...props} />
  ))
