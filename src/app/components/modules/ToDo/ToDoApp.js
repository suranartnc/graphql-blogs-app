import React from 'react'
import cx from 'classnames'

import s from './ToDoApp.scss'

function CheckBox ({ todo }) {
  return (
    <label>
      <input type="checkbox" checked={todo.status} disabled readOnly /> {todo.title}
    </label>
  )
}

function ToDoItem ({ todo }) {
  const renderSubTasks = () => {
    if (todo.tasks) {
      return <ToDoList todos={todo.tasks} subTasks />
    }
    return null
  }
  return (
    <li className={s.item}>
      <CheckBox todo={todo} />
      {renderSubTasks()}
    </li>
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
  const todoAllCount = todos.length
  const todoDoneCount = todos.filter((todo) => {
    return todo.status
  }).length
  const percent = todoDoneCount / todoAllCount * 100
  return (
    <div className={s.progressContainer}>
      <ProgressBar percent={percent} />
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
      <h2 className={s.title}>To-do List</h2>
      <ToDoList todos={todos} />
      <Progress todos={todos} />
    </div>
  )
}

export default ToDoApp
