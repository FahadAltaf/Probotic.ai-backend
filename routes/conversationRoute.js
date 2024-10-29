const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { getConversation } = require('../controllers/conversationController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();

router.post('/',clerkAuth,checkPermission('org:chatpool:conversations'), getConversation);


module.exports = router;
