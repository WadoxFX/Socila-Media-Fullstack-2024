require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const http = require('http')
const cookie = require('cookie')
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
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    secure: true,
  })
)
app.use('/images', express.static(path.join(__dirname, 'images')))

// routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/chat', chatRouter)

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  res.send('Server worker')
})

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
