// pages/api/socket.ts

import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket } from 'socket.io'
import { Server as IOServer } from 'socket.io'

let io: IOServer
const users: { [key: string]: string } = {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!io) {
    console.log('New Socket.io server...')
    const httpServer: HTTPServer = res.socket.server as any
    io = new IOServer(httpServer, {
      path: '/api/socket',
    })

    io.on('connection', (socket: Socket) => {
      console.log('New connection:', socket.id)

      socket.on('new-user', (name: string) => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
      })

      socket.on('send-chat-message', (message: string) => {
        socket.broadcast.emit('chat-message', { message, name: users[socket.id] })
      })

      socket.on('disconnect', () => {
        if (users[socket.id]) {
          const disconnectedUser = users[socket.id]
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete users[socket.id]
          socket.broadcast.emit('user-disconnected', disconnectedUser)
          console.log('User disconnected:', socket.id)
        }
      })
    })

    res.socket.server.io = io
  } else {
    console.log('Socket.io server already running...')
  }
  res.end()
}

export default ioHandler
