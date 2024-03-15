const User = require('../models/userSchema')
const Chat = require('../models/chatSchema')

class chatController {
  async start(req, res) {
    try {
      const { meId } = req.body
      const { userId } = req.params

      const chat = await Chat.findOne({ users: { $all: [meId, userId] } })
      if (chat) {
        await User.findByIdAndUpdate(meId, { $addToSet: { 'infos.chats': chat } })
        return res.status(200).json({ message: 'Chat already exists', chatId: chat._id })
      }

      const newChat = await Chat.create({
        users: [meId, userId],
      })

      const result = await User.updateMany(
        { _id: { $in: [meId, userId] } },
        { $addToSet: { 'infos.chats': newChat._id } },
        { new: true }
      )

      if (!result) {
        return res.status(404).json({ message: 'User not found or deleted' })
      }

      return res.status(201).json({ message: 'Chat created', chatId: newChat._id })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async valid(req, res) {
    try {
      const chat = await Chat.findById(req.params.chatId).select('users')
      const userValid = chat.users.includes(req.user.id)
      return res.status(200).json(userValid)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async chatList(req, res) {
    try {
      const { meId } = req.params
      const user = await User.findById(meId).select('infos.chats')
      const chats = await Chat.find({ _id: { $in: user.infos.chats } }).populate(
        'users',
        'username surname avatar _id'
      )

      return res.status(200).json(chats)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async companionData(req, res) {
    try {
      const meId = req.query.meId
      const chat = await Chat.findById(req.params.chatId).populate(
        'users',
        'username surname avatar _id'
      )

      if (!meId) {
        return res.status(200).json(chat.users)
      }

      const companion = chat.users.filter((user) => user._id.toString() !== meId)
      return res.status(200).json(...companion)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async messageList(req, res) {
    try {
      const { chatId } = req.params

      const chat = await Chat.findById(chatId).populate(
        'messages.creator',
        'username surname avatar _id'
      )

      return res.status(200).json(chat.messages)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async leaveChat(req, res) {
    try {
      const { chatId, meId } = req.body

      await User.findByIdAndUpdate(meId, { $pull: { 'infos.chats': chatId } })

      return res.status(204).end()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}

module.exports = new chatController()
