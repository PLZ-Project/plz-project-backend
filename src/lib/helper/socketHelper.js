const socketIo = require('socket.io')
const server = require('http').createServer()

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

module.exports = {
  io
}
