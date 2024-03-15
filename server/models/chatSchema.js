const { Schema, model } = require('mongoose')

const message = Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

const chatSchema = Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [message],
})

module.exports = model('Chat', chatSchema)
