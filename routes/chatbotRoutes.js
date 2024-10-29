const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { getChatbots, storeChatbots, findChatbot, configChatbot } = require('../controllers/chatbotController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();


router.post('/', clerkAuth, checkPermission('org:chatpool:view_chatbot'), getChatbots);
router.post('/create', clerkAuth, checkPermission('org:chatpool:create_chatbot'), storeChatbots)
router.post('/config', clerkAuth, checkPermission('org:chatpool:edit_chatbot'), configChatbot)
router.post('/:id', clerkAuth, checkPermission('org:chatpool:edit_chatbot'), findChatbot)


module.exports = router;