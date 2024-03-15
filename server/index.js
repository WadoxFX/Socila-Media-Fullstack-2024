require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')
const socket = require('./socket/socket')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const chatRouter = require('./routes/chatRouter')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['https://socila-media-client.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use('/images', express.static(path.join(__dirname, 'images')))

// routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/chat', chatRouter)

const server = http.createServer(app)
socket(server)

const RunServer = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK)
    server.listen(PORT)
  } catch (error) {
    return console.error('Server Run Error')
  }
}

RunServer()
