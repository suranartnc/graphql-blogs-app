import React from 'react'

import s from './ToDoApp.scss'

const todos = [
  {
    title: 'CI/CD',
    status: true
  }, {
    title: 'UI'
  }, {
    title: 'API'
  }, {
    title: 'Page'
  }
]

function CheckBox ({ todo }) {
  return (
    <label>
      <input type="checkbox" checked={todo.status} disabled readOnly /> {todo.title}
    </label>
  )
}

function ToDoItem ({ todo }) {
  return (
    <li className={s.item}>
      <CheckBox todo={todo} />
    </li>
  )
}

function ToDoList ({ todos }) {
  return (
    <div>
      {todos.map((todo, index) => {
        return <ToDoItem key={index} todo={todo} />
      })}
    </div>
  )
}

function Progress () {
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

function ToDoApp () {
  return (
    <div className={s.container}>
      <h2 className={s.title}>To-do List</h2>
      <ToDoList todos={todos} />
      <Progress />
    </div>
  )
}

export default ToDoApp
