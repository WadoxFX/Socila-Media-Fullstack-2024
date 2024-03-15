const { Router } = require('express')
const authController = require('../controllers/authController')
const validToken = require('../middlewares/validToken')
const router = Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/account', validToken, authController.account)
router.post('/deleteAccount', authController.deleteAccount)

module.exports = router
