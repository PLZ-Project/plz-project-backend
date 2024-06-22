const socketIo = require('socket.io')
const server = require('http').createServer()

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('🚀 ~ io.on ~ socket:', socket)
  console.log('A user connected')

  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`Socket ${socket.id} joined room ${room}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

function emitToUser(room, event, data) {
  io.to(room).emit(event, data)
}

module.exports = {
  io,
  emitToUser
}
