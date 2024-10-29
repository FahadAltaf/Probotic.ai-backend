const express = require('express');
const { storeUser, getUserById } = require('../controllers/userController');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();

router.post('/create', clerkAuth, checkPermission('org:chatpool:agents_create'), storeUser)
router.post('/', clerkAuth, checkPermission('org:chatpool:agents'), getUserById)


module.exports = router;
