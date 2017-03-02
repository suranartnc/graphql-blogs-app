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

export function prepareTodo (todo) {
  if (todo.done === true) {
    todo.tasks.forEach((todo) => {
      todo.done = true
    })
  }
  return todo
}

export function calProgress (todos) {
  let allTasks = findSubTasks(todos)
  const todoAllCount = allTasks.length
  const todoDoneCount = allTasks.filter((todo) => {
    return todo.done
  }).length
  const percent = (todoDoneCount / todoAllCount * 100).toFixed(2)
  return percent
}
