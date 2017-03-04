import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ToDoApp from './ToDoApp'
import { todos, todosWithSubTasks } from 'src/config/tasks'

const styles = {
  width: '100%',
  maxWidth: '300px',
  margin: '0 auto'
}

storiesOf('ToDoApp', module)
  .addDecorator((story) => (
    <div style={styles}>
      {story()}
    </div>
  ))
  .add('Only task group', () => (
    <ToDoApp todos={todos} />
  ))
  .add('With some sub tasks', () => (
    <ToDoApp todos={todosWithSubTasks} />
  ))
