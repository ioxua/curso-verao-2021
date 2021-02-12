const { performance } = require('perf_hooks')
const { readFileSync, writeFileSync, write } = require('fs')
const path = require('path')

const fileName = './storage.json'
const filePath = path.join(__dirname, fileName)

const readFile = () => {
  const fileContents = readFileSync(filePath).toString()
  return JSON.parse(fileContents)
}

const writeFile = (contents) => {
  const contentToWrite = Array.isArray(contents) ? (
    { todos: contents }
  ) : (
    contents
  )

  const contentsAsJSON = JSON.stringify(contentToWrite)
  writeFileSync(filePath, contentsAsJSON)
}

module.exports = {
  list(listDeleted = false) {
    const todos = readFile()?.todos ?? []
    const shownTodos = listDeleted ? (
      todos
    ) : (
      todos.filter(it => !it.deleted)
    )

    return shownTodos
  },
  create(todo) {
    const todos = readFile()?.todos ?? []
    todos.push({
      id: parseInt(performance.now()),
      title: todo,
    })
    writeFile(todos)
  },
  delete(id) {
    const todos = readFile()?.todos ?? []
    todos.forEach(it => {
      if (it.id === id) {
        it.deleted = true
      }
    })
    writeFile(todos)
  },
  toggle(id) {
    const todos = readFile()?.todos ?? []
    todos.forEach(it => {
      if (it.id === id) {
        it.done = !it.done
      }
    })
    writeFile(todos)
  },
}
