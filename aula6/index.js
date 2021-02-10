const express = require('express')
const exphbs  = require('express-handlebars')
const storage = require('./storage/fileStorage')

const app = express()
const port = 3000

// Makes our app parse request bodies as JSON
app.use(express.urlencoded({ extended: true }))
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs');

app.get('/', (_req, res) => {
  res.redirect('/todos')
})

app.get('/todos', (req, res) => {
  const title = req.query.title ?? 'All todos'
  const showDeleted = req.query.showDeleted ?? false

  res.render('list', {
    title,
    todos: storage.list(showDeleted),
  })
})

app.post('/todos', (req, res) => {
  const todo = req.body.todo
  if (todo) {
    storage.create(todo)
  }
  res.redirect('/todos')
})

app.get('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  if (id) {
    storage.delete(parseInt(id))
  }
  res.redirect('/todos')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
