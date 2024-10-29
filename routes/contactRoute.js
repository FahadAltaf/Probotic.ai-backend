const express = require('express');
const clerkAuth = require('../middlewares/clerkMiddleware');
const { getContacts } = require('../controllers/contactController');
const { checkPermission } = require('../helpers/auth');

const router = express.Router();


router.post('/', clerkAuth, checkPermission('org:chatpool:contacts'), getContacts)



module.exports = router;
