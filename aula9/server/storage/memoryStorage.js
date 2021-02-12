const { performance } = require('perf_hooks')

const todos = []

module.exports = {
  list(listDeleted = false) {
    const shownTodos = listDeleted ? (
      todos
    ) : (
      todos.filter(it => !it.deleted)
    )

    return shownTodos
  },
  create(todo) {
    todos.push({
      id: parseInt(performance.now()),
      title: todo,
    })
  },
  delete(id) {
    todos.forEach(it => {
      if (it.id === id) {
        it.deleted = true
      }
    })
  },
  toggle(id) {
    todos.forEach(it => {
      if (it.id === id) {
        it.done = !it.done
      }
    })
  },
}
