const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { getMessages } = require('../controllers/messageController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();

router.post('/',clerkAuth,checkPermission('org:chatpool:conversations'), getMessages);


module.exports = router;
