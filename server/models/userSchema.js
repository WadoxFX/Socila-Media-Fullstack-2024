const { Schema, model } = require('mongoose')

const userSchema = Schema({
  avatar: { type: String, default: '' },
  desc: { type: String, default: '.' },
  username: { type: String, trim: true },
  surname: { type: String, trim: true },
  password: { type: String, trim: true },
  email: { type: String, trim: true, unique: true, required: true },
  infos: {
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    liked: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    saved: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    subs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    mySubs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendsReq: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    block: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  },
})

module.exports = model('User', userSchema)
