const { Schema, model } = require('mongoose')

const comment = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    like: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const file = Schema(
  {
    type: String,
    path: String,
  },
  { _id: false }
)

const postSchema = Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    files: [file],
    comments: [comment],
    usersSaved: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

module.exports = model('Post', postSchema)
