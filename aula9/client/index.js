window.onload = () => {
  const todoTemplate = `
  <div class="row">
    <div class="col-2">
      <div class="form-check">
        <input
          class="form-check-input toggle-todo"
          type="checkbox"
          data-id="{{id}}"
          {{done}}
        >
      </div>
    </div>
    <div class="col-8">
      {{text}}
    </div>
    <div class="col-2">
      <a
        href="#"
        class="text-danger delete-todo"
        data-id="{{id}}"
      >✗</a>
    </div>
  </div>`

  const base = 'http://localhost:3000'
  const $todoText = $('#text')
  const $todoContainer = $('#todo-container')

  const setupDelete = () => {
    $('.delete-todo').on('click', function() {
      const id = $(this).data().id

      $.ajax(base + `/todos/${id}`, {
        method: 'DELETE'
      })
        .done(() => {
          renderTodos()
          swal("Successfully deleted", "", "success")
        })
    })
  }

  const setupToggle = () => {
    $('.toggle-todo').on('click', function() {
      const id = $(this).data().id

      $.ajax(base + `/todos/${id}/toggle`, {
        method: 'POST'
      })
    })
  }

  const renderTodos = () => {
    // $.get()
    $.ajax(base + '/todos')
      .done((res) => {
        const htmls = res?.todos?.map(todo => {
          const done = !!todo.done
            ? `checked=""`
            : ''
          return todoTemplate
            .replaceAll("{{done}}", done)
            .replaceAll("{{text}}", todo.title)
            .replaceAll("{{id}}", todo.id)
        })
        $todoContainer.html(htmls)
        setupDelete()
        setupToggle()
      })
  }
  renderTodos()

  $('#todo-form').on('submit', (evt) => {
    evt.preventDefault()
    const text = $todoText.val()

    // $.post()
    $.ajax(base + '/todos', {
      method: 'POST',
      data: {
        todo: text,
      }
    })
      .done(() => {
        $todoText.val('')
        $todoText.focus()
        renderTodos()
      })
  })
}
