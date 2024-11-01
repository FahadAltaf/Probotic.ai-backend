const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { findChannel, getChannels, createChannels, configChannels } = require('../controllers/channelController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();


router.post('/', getChannels)
router.post('/create', clerkAuth, checkPermission('org:chatpool:create_channel'), createChannels)
router.post('/config', clerkAuth, checkPermission('org:chatpool:edit_channel'), configChannels)
router.post('/:id', clerkAuth, checkPermission('org:chatpool:edit_channel'), findChannel)



module.exports = router;
