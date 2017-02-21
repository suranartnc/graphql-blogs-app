import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Styleguide from './Styleguide'

const CenterDecorator = (story) => (
  <div style={{
    textAlign: 'center',
    width: '350px',
    margin: 'auto',
    backgroundColor: '#eee',
    padding: '30px'
  }}>
    {story()}
  </div>
)

storiesOf('Styleguide', module)
  .addDecorator(CenterDecorator)
  .add('Color', () => (
    <Styleguide />
  ))
