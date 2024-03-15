const { verify } = require('jsonwebtoken')

const validToken = (req, res, next) => {
  const token = req.query.token || req.cookies.token

  if (token) {
    verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) throw err
      req.user = user
      return next()
    })
  } else {
    return res.status(401).json({ message: 'Token is missing' })
  }
}

module.exports = validToken
