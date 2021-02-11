window.ioxua = window.ioxua ?? {}
window.ioxua.setupTodoList = () => {
  const STORAGE_KEY = []

  Vue.component('iox-todo', {
    props: ['todo', 'onToggle'],
    methods: {
      onToggleInput: function() {
        this.$emit('toggle', this.todo.id)
      },
      onDelete: function() {
        this.$emit('exclude', this.todo.id)
      },
    },
    template: `<div>
      <input
        type="checkbox"
        v-bind:checked="todo.done"
        v-on:change="onToggleInput"
      >
      {{ todo.text }}
      <a href="#" @click="onDelete">❌</a>
    </div>`,
  })

  window.todoList = new Vue({
    el: '#todoList',
    data: {
      todos: [],
      textInput: '',
      nextId: null,
    },
    created: function() {
      const todosAsText = localStorage.getItem(STORAGE_KEY) ?? '[]'
      const todosAsArr  = JSON.parse(todosAsText)
      this.todos = todosAsArr
      this.nextId = todosAsArr.length > 0
        ? Math.max(...(todosAsArr.map(t => t.id)))
        : 0
    },
    methods: {
      toggleTodo: function(id) {
        this.todos.forEach(todo => {
          if (todo.id === id) {
            todo.done = !todo.done
          }
        })

        this.persist()
      },
      persist: function() {
        const todosAsText = JSON.stringify(this.todos)
        localStorage.setItem(STORAGE_KEY, todosAsText)
      },
      save: function() {
        this.todos.push({
          id: ++this.nextId,
          done: false,
          text: this.textInput,
        })
        this.textInput = ''
      },
      exclude: function(id) {
        this.todos = this.todos
          .filter(t => t.id !== id)
      },
    },
  })
}
