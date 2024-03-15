const { Router } = require('express')
const chatController = require('../controllers/chatController')
const validToken = require('../middlewares/validToken')
const router = Router()

router.post('/start/:userId', chatController.start)
router.get('/valid/:chatId', validToken, chatController.valid)
router.get('/list/:meId', chatController.chatList)
router.get('/companion/:chatId', chatController.companionData)
router.get('/messageList/:chatId', chatController.messageList)
router.put('/leave', chatController.leaveChat)

module.exports = router
