import React from 'react'
import { storiesOf } from '@kadira/storybook'

import HomePage from 'components/pages/Home/HomePage'
import withPreloader from 'hocs/withPreloader'
import mockData from './utils/mockData'

const props = {
  data: {
    loading: true,
    posts: mockData(3)
  },
  onNextPageClicked: function (e) {
    console.log('onNextPageClicked', e)
  }
}

storiesOf('HomePage', module)
  .add('Normal', () => (
    <HomePage {...props} />
  ))
  .add('Loading', () => {
    const HomePageWithPreloader = withPreloader(HomePage)
    return <HomePageWithPreloader {...props} />
  })
