const express = require('express')
const exphbs  = require('express-handlebars')
const storage = require('./storage/fileStorage')

const app = express()
const port = 3000

// Makes our app parse request bodies as JSON
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_req, res) => {
  res.redirect('/todos')
})

app.get('/todos', (req, res) => {
  const showDeleted = req.query.showDeleted ?? false

  res.json({
    todos: storage.list(showDeleted),
  })
})

app.get('/todos/table', (req, res) => {
  const showDeleted = req.query.showDeleted ?? false

  res.json({
    data: storage.list(showDeleted)
  })
})

app.post('/todos', (req, res) => {
  const todo = req.body.todo
  if (todo) {
    storage.create(todo)
    res.status(204).end()
  } else {
    res.status(400).end()
  }
})

app.post('/todos/:id/toggle', (req, res) => {
  const id = req.params.id
  if (id) {
    storage.toggle(parseInt(id))
    res.status(204).end()
  } else {
    res.status(400).end()
  }
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (id) {
    storage.delete(parseInt(id))
    res.status(204).end()
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
