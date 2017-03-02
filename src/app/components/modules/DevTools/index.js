import React from 'react'
import ToDoApp from './ToDo/ToDoApp'

import { todos } from 'src/config/tasks'

function DevTools () {
  if (process.env.NODE_ENV === 'production') {
    return null
  }
  return (
    <ToDoApp todos={todos} />
  )
}

export default DevTools
