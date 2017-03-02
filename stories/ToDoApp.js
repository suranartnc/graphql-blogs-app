import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ToDoApp from 'components/modules/ToDo/ToDoApp'

const todos = [
  {
    title: 'CI/CD',
    status: true
  }, {
    title: 'UI'
  }, {
    title: 'Page'
  }
]

const todosWithSubTasks = [
  ...todos,
  {
    title: 'API',
    tasks: [
      {
        title: 'Solr',
        status: true
      }, {
        title: 'Discussion'
      }
    ]
  }
]

const styles = {
  width: '100%',
  'max-width': '300px',
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
