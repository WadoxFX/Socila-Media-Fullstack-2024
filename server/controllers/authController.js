const { hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const fs = require('fs')
const User = require('../models/userSchema')

class authController {
  async signup(req, res) {
    try {
      const { username, surname, email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(409).json({ message: 'User already exists' })
      }

      const hashPassword = hashSync(password.toLowerCase(), 10)
      await User.create({
        username,
        surname,
        email,
        password: hashPassword,
      })

      return res.status(201).json({ message: 'User is registered' })
    } catch (error) {
      console.error('Registration error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) return res.status(404).json({ message: 'User is not found' })

      const validPassword = compareSync(password.toLowerCase(), user.password)
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect password' })
      }

      const token = sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
      )

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: 'none',
        secure: true,
      })

      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error('Login error:', error)
      return res.status(500).json({ error: 'Server Error' })
    }
  }

  async logout(req, res) {
    res.clearCookie('token')
    return res.status(204).end()
  }

  async deleteAccount(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) return res.status(404).json({ message: 'User not found' })

      const validPassword = compareSync(password.toLowerCase(), user.password)
      if (!validPassword) return res.status(401).json({ message: 'Invalid password' })

      await User.findByIdAndDelete(user._id)
      if (user.avatar) {
        fs.unlink(user.avatar, (err) => {
          if (err) throw err
        })
      }

      return res.status(204).end()
    } catch (error) {
      console.error('Error deleting account:', error)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  async account(req, res) {
    const user = await User.findById(req.user.id).select('username surname email avatar desc')
    return res.status(200).json(user)
  }
}

module.exports = new authController()
