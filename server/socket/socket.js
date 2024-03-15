const { Server } = require('socket.io')
const Chat = require('../models/chatSchema')

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } })
  const people = {}

  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
    // socket.disconnect(true)

    socket.on('login', (data) => {
      people[data.userId] = socket.id
      socket.meId = data.userId
    })

    socket.on('join_room', (data) => {
      socket.join(data.room)
      socket.room = data.room
      socket.broadcast.to(data.room).emit('status', true)
    })

    socket.on('companion_status', (data) => {
      socket.broadcast.to(data.room).emit('update_status', true)
    })

    socket.on('send_message', async (data) => {
      socket.broadcast.to(data.room).emit('get_message', data)
      socket.to(people[data.userId]).emit('popup_message', data)

      const message = await Chat.findByIdAndUpdate(
        data.room,
        {
          $push: {
            messages: {
              creator: data.creator._id,
              content: data.content,
              createAt: data.createAt,
            },
          },
        },
        { new: true }
      )

      if (!message) console.log('Error send')
    })

    socket.on('typing', (data) => {
      socket.broadcast.to(data.room).emit('is_typing', true)
    })

    socket.on('disconnect', () => {
      console.log(`User: ${socket.id} disconnect`)
      delete people[socket.meId]
      socket.broadcast.to(socket.room).emit('status', false)
      socket.leave(socket.rooms)
    })

    return io
  })
}
