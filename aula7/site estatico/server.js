var StaticServer = require('static-server')
var server = new StaticServer({
  rootPath: 'dist',
  port: 3000,
  cors: '*',
})

server.start(function () {
  console.log('Server listening on', server.port);
})
