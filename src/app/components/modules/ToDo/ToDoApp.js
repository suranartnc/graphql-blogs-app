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
    <div className={s.item}>
      <CheckBox todo={todo} />
      {renderSubTasks()}
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

function findSubTasks (todos) {
  let subTasks = []
  todos.forEach((todo) => {
    if (todo.tasks) {
      subTasks = [
        ...subTasks,
        ...findSubTasks(todo.tasks)
      ]
      return
    }
    subTasks = [
      ...subTasks,
      todo
    ]
  })
  return subTasks
}

function calProgress (todos) {
  let allTasks = findSubTasks(todos)
  const todoAllCount = allTasks.length
  const todoDoneCount = allTasks.filter((todo) => {
    return todo.status
  }).length
  const percent = todoDoneCount / todoAllCount * 100
  return percent
}

function Progress ({ todos }) {
  const percent = calProgress(todos)
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
