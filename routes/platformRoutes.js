const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { getPlatformList } = require('../controllers/channelController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();

router.post('/', clerkAuth, checkPermission('org:chatpool:view_channel'), getPlatformList);


module.exports = router;
