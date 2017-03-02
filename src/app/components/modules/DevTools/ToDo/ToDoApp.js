import React from 'react'
import cx from 'classnames'

import { calProgress, prepareTodo } from './ToDoUtils'

import s from './ToDoApp.scss'

function CheckBox ({ todo }) {
  return (
    <label>
      <input type="checkbox" checked={todo.done} disabled readOnly /> {todo.title}
    </label>
  )
}

function ToDoItem ({ todo }) {
  const renderSubTasks = (todo) => {
    if (todo.tasks) {
      const preparedTodo = prepareTodo(todo)
      return <ToDoList todos={preparedTodo.tasks} subTasks />
    }
    return null
  }
  return (
    <div className={s.item}>
      <CheckBox todo={todo} />
      {renderSubTasks(todo)}
    </div>
  )
}

function ToDoList ({ todos, subTasks = false }) {
  return (
    <div className={cx(s.list, { 'sub-tasks': subTasks })}>
      {todos.map((todo, index) => {
        return <ToDoItem key={index} todo={todo} />
      })}
    </div>
  )
}

function Progress ({ todos }) {
  const percent = calProgress(todos)
  return (
    <div>
      <div className={s.progressContainer}>
        <ProgressBar percent={percent} />
      </div>
      <p className={s.percent}>{percent} %</p>
    </div>
  )
}

function ProgressBar ({ percent }) {
  const style = {
    width: `${percent}%`
  }
  return (
    <div className={s.progressBar} style={style} />
  )
}

function ToDoApp ({ todos }) {
  return (
    <div className={s.container}>
      <Progress todos={todos} />
      <h2 className={s.title}>Tasks</h2>
      <ToDoList todos={todos} />
    </div>
  )
}

export default ToDoApp
