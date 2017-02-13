import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Styleguide from 'components/Styleguide'

storiesOf('Styleguide', module)
  .add('to Storybook', () => (
    <Styleguide />
  ))
