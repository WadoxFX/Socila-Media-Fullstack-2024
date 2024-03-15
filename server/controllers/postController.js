const User = require('../models/userSchema')
const Post = require('../models/postSchema')
const fs = require('fs')

class postController {
  async create(req, res) {
    try {
      const { id, content } = req.body
      const files = req.files

      const pathes = files.map((file) => {
        return {
          type: file.mimetype,
          path: file.path,
        }
      })

      const post = new Post({
        content,
        creator: id,
        files: pathes,
      })

      const user = await User.findByIdAndUpdate(
        id,
        { $push: { 'infos.posts': post } },
        { new: true }
      )

      if (!user) return res.status(404).json({ message: 'User not found' })
      await post.save()

      return res.status(201).json({ message: 'Post creating' })
    } catch (error) {
      console.error('Post creation error', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async delete(req, res) {
    try {
      const { postId } = req.body

      const post = await Post.findById(postId)
      if (!post) return res.status(404).json({ message: 'Post not found' })

      await User.updateMany(
        { $or: [{ 'infos.posts': postId }, { 'infos.liked': postId }, { 'infos.saved': postId }] },
        { $pull: { 'infos.posts': postId, 'infos.liked': postId, 'infos.saved': postId } }
      )

      if (post.files.length) {
        for (let i = 0; post.files.length > i; i++) {
          fs.unlink(post.files[i].path, (err) => {
            if (err) throw err
          })
        }
      }

      await Post.findByIdAndDelete(postId)

      return res.status(204).end()
    } catch (error) {
      console.error('Post could not be deleted', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async data(req, res) {
    try {
      const post = await Post.findById(req.params.postId)
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'username surname avatar',
          },
        })
        .populate('creator', 'username surname avatar')
      return res.status(200).json(post)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async postList(req, res) {
    try {
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const skip = (page - 1) * limit

      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ message: 'User is not found' })

      const posts = await Post.find({ _id: user.infos.posts })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate('creator', 'username surname avatar ')

      return res.status(200).json(posts)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async likedList(req, res) {
    try {
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const skip = (page - 1) * limit

      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ message: 'User is not found' })

      const posts = await Post.find({ _id: user.infos.liked })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate('creator', 'username surname avatar ')

      return res.status(200).json(posts)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async savedList(req, res) {
    try {
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const skip = (page - 1) * limit

      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ message: 'User is not found' })

      const posts = await Post.find({ _id: user.infos.saved })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate('creator', 'username surname avatar ')

      return res.status(200).json(posts)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async like(req, res) {
    try {
      const { userId, postId } = req.body

      const result = await Post.findByIdAndUpdate(postId, { $addToSet: { usersLiked: userId } })

      if (!result) {
        return res.status(404).json({ message: 'Post not found or deleted' })
      }

      const addLiked = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { 'infos.liked': postId } },
        { new: true }
      )

      if (!addLiked) {
        return res.status(400).json({ message: 'Post not added to favorites' })
      }

      return res.status(200).json({ message: 'You liked the post' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Like Post Error' })
    }
  }

  async dislike(req, res) {
    try {
      const { userId, postId } = req.body

      const post = await Post.findByIdAndUpdate(postId, { $pull: { usersLiked: userId } })
      if (!post) return res.status(404).json({ message: 'Post not found or deleted' })

      await User.findByIdAndUpdate(userId, {
        $pull: { 'infos.liked': postId },
      })

      return res.status(200).json({ message: 'You removed the like from the post' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Like Post Error' })
    }
  }

  async comments(req, res) {
    try {
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const skip = (page - 1) * limit

      const post = await Post.findById(req.params.postId)
        .select('comments')
        .populate('comments.user', 'username surname avatar')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)

      if (!post) return res.status(404).json({ message: 'User is not found' })

      return res.status(200).json(post.comments)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async addComment(req, res) {
    try {
      const { meId, content, postId } = req.body

      const user = await User.findById(meId)
      if (!user) return res.status(200).json({ message: 'User is not found' })

      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: {
            user: meId,
            text: content,
          },
        },
      })

      return res.status(200).json({ message: 'You add a comment' })
    } catch (error) {
      console.error('Failed to create a comment:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async likeComment(req, res) {
    try {
      const { postId, userId, commentId } = req.body

      const result = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': commentId },
        { $addToSet: { 'comments.$.like': userId } },
        { new: true }
      )

      if (!result) {
        return res.status(400).json({ message: 'Post not found or failed to like' })
      }

      return res.status(200).json({ message: 'You liked the comment' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async dislikeComment(req, res) {
    try {
      const { postId, userId, commentId } = req.body

      await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': commentId },
        { $pull: { 'comments.$.like': userId } }
      )

      return res.status(200).json({ message: 'You liked the comment' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId, postId } = req.body
      const result = await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      )

      if (!result) {
        return res.status(404).json({ message: 'Post not found or comment not removed' })
      }

      return res.status(204).end()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async save(req, res) {
    try {
      const { userId, postId } = req.body
      const saveForUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { 'infos.saved': postId } },
        { new: true }
      )

      if (!saveForUser) {
        return res.status(404).json({ message: 'Post deleted or not found' })
      }

      const saveForPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { usersSaved: userId } },
        { new: true }
      )

      if (!saveForPost) {
        return res.status(404).json({ message: 'Post deleted or not found' })
      }

      return res.status(200).json({ message: 'Post added to favorites' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async lose(req, res) {
    try {
      const { userId, postId } = req.body
      await User.findByIdAndUpdate(userId, { $pull: { 'infos.saved': postId } })
      await Post.findByIdAndUpdate(postId, { $pull: { usersSaved: userId } })

      return res.status(200).json({ message: 'Post removed from favorites' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async tape(req, res) {
    try {
      const { id } = req.params
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const skip = (page - 1) * limit

      const user = await User.findById(id).select('infos.mySubs infos.friends')

      // get popular users
      const popularUsers = await User.find().select('_id').sort({ 'infos.subs': -1 }).limit(10)
      const popularIds = popularUsers.map((user) => user.id)

      // original ids
      const addUsers = [...user.infos.mySubs, ...popularIds, id]
      const peoples = [...new Set(addUsers)]

      const posts = peoples.map(async (userId) => {
        const user = await User.findById(userId).select('infos.posts')
        return user.infos.posts
      })

      const postIdList = await Promise.all(posts)
      const postDatas = await Post.find({ _id: postIdList.flat() })
        .populate('creator', 'username surname avatar')
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })

      return res.status(200).json(postDatas)
    } catch (error) {
      console.error('Tape Error:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}

module.exports = new postController()
