const User = require('../models/userSchema')
const { hashSync } = require('bcrypt')

class UserController {
  async profile(req, res) {
    try {
      const { id } = req.params

      const user = await User.findById(id).select('avatar desc username surname')
      if (!user) return req.status(404).json({ message: 'User not found' })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async statistic(req, res) {
    try {
      const { id } = req.params

      const user = await User.findById(id).select(
        'infos.posts infos.subs infos.friends infos.friendsReq'
      )
      if (!user) return req.status(404).json({ message: 'User not found' })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async subscribe(req, res) {
    try {
      const { meId, userId } = req.body

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { 'infos.subs': meId } },
        { new: true }
      )

      if (!user) return res.status(404).json({ message: 'User not found' })

      await User.findByIdAndUpdate(meId, { $addToSet: { 'infos.mySubs': userId } })

      return res.status(200).json({ message: 'You have subscribed' })
    } catch (error) {
      console.error('Subscription error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async request(req, res) {
    try {
      const { meId } = req.params

      const friendList = await User.findById(meId)
        .select('infos.friendsReq')
        .populate('infos.friendsReq', 'username surname avatar desc')

      if (!friendList) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json(friendList.infos.friendsReq)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async confirmFriend(req, res) {
    try {
      const { meId, userId } = req.body

      await User.findByIdAndUpdate(meId, { $pull: { 'infos.friendsReq': userId } })
      await User.findByIdAndUpdate(userId, { $pull: { 'infos.friendsReq': meId } })

      await User.findByIdAndUpdate(meId, { $addToSet: { 'infos.friends': userId } })
      await User.findByIdAndUpdate(userId, { $addToSet: { 'infos.friends': meId } })

      return res.status(204).end()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async friends(req, res) {
    try {
      const { meId } = req.params

      const user = await User.findById(meId)
        .select('infos.friends')
        .populate('infos.friends', 'username surname avatar desc')
      if (!user) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json(user.infos.friends)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async delFriend(req, res) {
    try {
      const { meId, userId } = req.body

      const user = await User.findByIdAndUpdate(meId, { $pull: { 'infos.friends': userId } })
      if (!user) return res.status(404).json({ message: 'User not found' })

      const user2 = await User.findByIdAndUpdate(userId, { $pull: { 'infos.friends': meId } })
      if (!user2) return res.status(404).json({ message: 'User not found' })

      return res.status(204).end()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async delRequest(req, res) {
    try {
      const { meId, userId } = req.body

      await User.findByIdAndUpdate(meId, { $pull: { 'infos.friendsReq': userId } })

      return res.status(204).end()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async unsubscribe(req, res) {
    try {
      const { meId, userId } = req.body

      await User.findByIdAndUpdate(userId, {
        $pull: { 'infos.subs': meId },
      })

      await User.findByIdAndUpdate(meId, {
        $pull: { 'infos.mySubs': userId },
      })

      return res.status(200).json({ message: 'You unsubscribed' })
    } catch (error) {
      console.error('Subscription cancellation error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async addFriend(req, res) {
    try {
      const { meId, userId } = req.body

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { 'infos.friendsReq': meId } },
        { new: true }
      )

      if (!user) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json({ message: 'Friend request sent' })
    } catch (error) {
      console.error('Error sending friend request:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async recallFriend(req, res) {
    try {
      const { meId, userId } = req.body

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { 'infos.friendsReq': meId } },
        { new: true }
      )

      if (!user) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json({ message: 'Friend request sent' })
    } catch (error) {
      console.error('Error recall friend request:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async editProfile(req, res) {
    try {
      const { meId, username, surname, email, password, desc } = req.body
      const file = req.file
      const option = {}

      if (file) option.avatar = file.path
      if (username) option.username = username
      if (surname) option.surname = surname
      if (email) option.email = email
      if (password) {
        const hashPassword = hashSync(password.toLowerCase(), 10)
        option.password = hashPassword
      }
      if (desc) option.desc = desc

      if (Object.keys(option).length > 0) {
        const user = await User.findByIdAndUpdate(meId, { $set: option }, { new: true })
        if (!user) return res.status(404).json({ message: 'User not found' })
      }

      return res.status(200).json({ message: 'Changes made successfully' })
    } catch (error) {
      console.error('Error edit profile:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async search(req, res) {
    try {
      const limit = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      const search = req.query._search
      const skip = (page - 1) * limit

      const searchUser = await User.find({
        $or: [
          {
            $and: [
              { username: new RegExp(search.split(' ')[0], 'i') },
              { surname: new RegExp(search.split(' ')[1], 'i') },
            ],
          },
          {
            $and: [
              { surname: new RegExp(search.split(' ')[0], 'i') },
              { username: new RegExp(search.split(' ')[1], 'i') },
            ],
          },
        ],
      })
        .select('username surname desc avatar infos.subs infos.friendsReq infos.friends')
        .limit(limit)
        .skip(skip)

      return res.status(200).json(searchUser)
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }
}

module.exports = new UserController()
