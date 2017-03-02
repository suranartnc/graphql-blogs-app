import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ToDoApp from 'components/modules/ToDo/ToDoApp'

const styles = {
  width: '100%',
  'max-width': '300px',
  margin: '0 auto'
  // border: '1px solid black'
}

storiesOf('ToDoApp', module)
  .addDecorator((story) => (
    <div style={styles}>
      {story()}
    </div>
  ))
  .add('Normal', () => (
    <ToDoApp />
  ))
