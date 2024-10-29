const express = require('express');
const { fetchOrgnization } = require('../controllers/orgnizationController');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();

router.post('/', clerkAuth, checkPermission('org:chatpool:view_channel'), fetchOrgnization)

module.exports = router;
